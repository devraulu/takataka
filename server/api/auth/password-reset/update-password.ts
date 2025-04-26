import {
    ipPasswordHashRateLimit,
    verifyPasswordStrength,
} from '#root/server/lib/password';
import {
    deletePasswordResetSessionTokenCookie,
    invalidateUserPasswordResetSessions,
    validatePasswordResetSessionRequest,
} from '#root/server/lib/password-reset';
import {
    createSession,
    generateSessionToken,
    SessionFlags,
    setSessionTokenCookie,
} from '#root/server/lib/session';
import { updateUserPassword } from '#root/server/lib/user';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';

const updatePasswordRoute = new Hono();

updatePasswordRoute.post('/', async c => {
    // TODO: Assumes X-Forwarded-For is always included.
    const clientIP = c.req.header('X-Forwarded-For');
    if (clientIP !== null && !ipPasswordHashRateLimit.check(clientIP, 1)) {
        return c.json('Too many requests', 429);
    }

    const { session: passwordResetSession, user } =
        await validatePasswordResetSessionRequest(c);
    if (passwordResetSession === null) {
        return c.json('Please restart the process', 401);
    }
    if (!passwordResetSession.emailVerified) {
        return c.json('Forbidden', 403);
    }
    if (user.registered2fa && !passwordResetSession.twoFactorVerified) {
        return c.json('Forbidden', 403);
    }
    const data = await c.req.json();
    const parser = new ObjectParser(data);

    let password: string;
    try {
        password = parser.getString('password');
    } catch {
        return c.json('Please enter your code', 400);
    }
    const strongPassword = await verifyPasswordStrength(password);
    if (!strongPassword) {
        return c.json('Weak password', 400);
    }
    if (clientIP !== null && !ipPasswordHashRateLimit.consume(clientIP, 1)) {
        return c.json('Too many requests', 429);
    }

    await invalidateUserPasswordResetSessions(passwordResetSession.userId);

    await updateUserPassword(passwordResetSession.userId, password);

    const sessionFlags: SessionFlags = {
        twoFactorVerified: passwordResetSession.twoFactorVerified,
    };

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id, sessionFlags);
    setSessionTokenCookie(c, sessionToken, session.expiresAt);
    await deletePasswordResetSessionTokenCookie(c);

    return c.body(null, 204);
});

export default updatePasswordRoute;
