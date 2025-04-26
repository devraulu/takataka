import { verifyEmailInput } from '#root/server/lib/email';
import { ipPasswordHashRateLimit } from '#root/server/lib/password';
import {
    createPasswordResetSession,
    invalidateUserPasswordResetSessions,
    ipPasswordResetRateLimit,
    sendPasswordResetEmail,
    setPasswordResetSessionTokenCookie,
    userPasswordResetRateLimit,
} from '#root/server/lib/password-reset';
import { generateSessionToken } from '#root/server/lib/session';
import { getUserFromEmail } from '#root/server/lib/user';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';

const sessionRoute = new Hono();

sessionRoute.post('/', async c => {
    // TODO: Assumes X-Forwarded-For is always included.
    const clientIP = c.req.header('X-Forwarded-For');

    if (clientIP != null && !ipPasswordHashRateLimit.check(clientIP, 2)) {
        return c.json('Too many requests', 429);
    }
    if (clientIP != null && !ipPasswordResetRateLimit.check(clientIP, 1)) {
        return c.json('Too many requests', 429);
    }

    const data: unknown = await c.req.json();
    const parser = new ObjectParser(data);

    let email: string;
    try {
        email = parser.getString('email').toLowerCase();
    } catch {
        return c.json('Please restart the process', 400);
    }
    if (!verifyEmailInput(email)) {
        return c.json('Invalid email', 400);
    }
    const user = await getUserFromEmail(email);
    if (user === null) {
        return c.json('Account does not exist', 400);
    }
    if (!userPasswordResetRateLimit.check(user.id, 1)) {
        return c.json('Too many requests', 429);
    }

    if (clientIP != null && !ipPasswordHashRateLimit.consume(clientIP, 1)) {
        return c.json('Too many requests', 429);
    }
    if (clientIP != null && !ipPasswordResetRateLimit.consume(clientIP, 1)) {
        return c.json('Too many requests', 429);
    }
    if (!userPasswordResetRateLimit.consume(user.id, 1)) {
        return c.json('Too many requests', 429);
    }
    await invalidateUserPasswordResetSessions(user.id);

    const sessionToken = generateSessionToken();
    const session = await createPasswordResetSession(
        sessionToken,
        user.id,
        user.email,
    );
    await sendPasswordResetEmail(session.email, session.emailVerificationCode);
    setPasswordResetSessionTokenCookie(c, sessionToken, session.expiresAt);

    return c.body(null, 201);
});

export default sessionRoute;
