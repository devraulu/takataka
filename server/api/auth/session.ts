import {
    ipPasswordHashRateLimit,
    verifyPasswordHash,
} from '#root/server/lib/password';
import {
    createSession,
    generateSessionToken,
    SessionFlags,
    setSessionTokenCookie,
} from '#root/server/lib/session';
import {
    getUserFromEmail,
    getUserPasswordHash,
    userLoginRateLimit,
} from '#root/server/lib/user';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';

const app = new Hono();

app.post('/', async c => {
    // TODO: Assumes X-Forwarded-For is always provided
    const clientIP = c.req.header('X-Forwarded-For');
    if (clientIP != null && !ipPasswordHashRateLimit.check(clientIP, 1)) {
        return c.text('Too many requests', 429);
    }

    const data = await c.req.json();
    const parser = new ObjectParser(data);

    let email: string, password: string;

    try {
        email = parser.getString('email').toLowerCase();
        password = parser.getString('password');
    } catch {
        return c.text('Invalid or missing fields', 400);
    }

    const user = await getUserFromEmail(email);
    if (user == null) return c.text('Account does not exist', 400);

    if (clientIP != null && !ipPasswordHashRateLimit.consume(clientIP, 1)) {
        return c.text('Too many requests', 429);
    }

    if (!userLoginRateLimit.consume(user.id, 1)) {
        return c.text('Too many requests', 429);
    }
    const passwordHash = await getUserPasswordHash(user.id);
    const validPassword = await verifyPasswordHash(passwordHash, password);

    if (!validPassword) {
        return c.text('Invalid password', 400);
    }

    userLoginRateLimit.reset(user.id);

    const flags: SessionFlags = {
        twoFactorVerified: false,
    };

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id, flags);
    setSessionTokenCookie(c, sessionToken, session.expiresAt);

    return c.body(null, 201);
});

export default app;
