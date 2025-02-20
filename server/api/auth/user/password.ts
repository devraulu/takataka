import Env from '#root/server/env';
import {
    ipPasswordHashRateLimit,
    userUpdatePasswordRateLimit,
    verifyPasswordHash,
    verifyPasswordStrength,
} from '#root/server/lib/password';
import {
    createSession,
    generateSessionToken,
    invalidateAllSessions,
    SessionFlags,
    setSessionTokenCookie,
} from '#root/server/lib/session';
import { getUserPasswordHash, updateUserPassword } from '#root/server/lib/user';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';

const passwordRoute = new Hono<Env>();

passwordRoute.patch('/', async c => {
    // TODO: Assumes X-Forwarded-For is always included.
    const clientIP = c.req.header('X-Forwarded-For');

    if (clientIP !== null && !ipPasswordHashRateLimit.check(clientIP, 1)) {
        return c.json('Too many requests', 429);
    }

    if (c.var.user === null || c.var.session === null) {
        return c.json('Not authenticated', 401);
    }
    if (c.var.user.registered2fa && !c.var.session.twoFactorVerified) {
        return c.json('Forbidden', 403);
    }
    if (!userUpdatePasswordRateLimit.check(c.var.session.userId, 1)) {
        return c.json('Too many requests', 429);
    }

    const data = await c.req.json();

    const parser = new ObjectParser(data);
    let password: string, newPassword: string;
    try {
        password = parser.getString('password');
        newPassword = parser.getString('new_password');
    } catch {
        return c.json('Please enter your password', 400);
    }
    const strongPassword = await verifyPasswordStrength(newPassword);
    if (!strongPassword) {
        return c.json('Weak password', 400);
    }
    if (clientIP !== null && !ipPasswordHashRateLimit.consume(clientIP, 1)) {
        return c.json('Too many requests', 429);
    }
    if (!userUpdatePasswordRateLimit.consume(c.var.session.userId, 1)) {
        return c.json('Invalid password', 400);
    }
    const passwordHash = await getUserPasswordHash(c.var.user.id);
    const validPassword = await verifyPasswordHash(passwordHash, password);

    if (!validPassword) {
        return c.json('Incorrect password', 400);
    }

    userUpdatePasswordRateLimit.reset(c.var.session.userId);
    await invalidateAllSessions(c.var.user.id);
    await updateUserPassword(c.var.user.id, newPassword);

    const sessionToken = generateSessionToken();
    const sessionFlags: SessionFlags = {
        twoFactorVerified: c.var.session.twoFactorVerified,
    };
    const session = await createSession(
        sessionToken,
        c.var.user.id,
        sessionFlags,
    );
    setSessionTokenCookie(c, sessionToken, session.expiresAt);

    return c.body(null, 204);
});

export default passwordRoute;
