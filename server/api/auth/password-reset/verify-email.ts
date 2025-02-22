import { verifyPasswordHash } from '#root/server/lib/password';
import {
    getPasswordResetSessionEmailVerificationCodeHash,
    invalidateUserPasswordResetSessions,
    setPasswordResetSessionAsEmailVerified,
    userPasswordResetVerificationRateLimit,
    validatePasswordResetSessionRequest,
} from '#root/server/lib/password-reset';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';

const verifyEmailRoute = new Hono();

verifyEmailRoute.post('/', async c => {
    const { session } = await validatePasswordResetSessionRequest(c);

    if (session == null) {
        return c.text('Please restart the process', 401);
    }

    if (session.emailVerified) {
        return c.text('Forbidden', 403);
    }

    if (!userPasswordResetVerificationRateLimit.check(session.userId, 1)) {
        await invalidateUserPasswordResetSessions(session.userId);
        return c.text('Too many requests', 429);
    }

    const data = await c.req.json();
    const parser = new ObjectParser(data);

    let code: string;

    try {
        code = parser.getString('code');
    } catch {
        return c.text('Invalid or missing fields', 400);
    }

    if (code == '') {
        return c.text('Please enter your code', 400);
    }

    if (!userPasswordResetVerificationRateLimit.consume(session.userId, 1)) {
        await invalidateUserPasswordResetSessions(session.userId);
        return c.text('Too many requests', 429);
    }

    const hash = await getPasswordResetSessionEmailVerificationCodeHash(
        session.token,
    );

    if (hash == null) {
        return c.text('Unexpected error', 500);
    }

    const validCode = await verifyPasswordHash(hash, code);
    if (!validCode) {
        return c.text('Incorrect code', 400);
    }

    userPasswordResetVerificationRateLimit.reset(session.userId);
    await setPasswordResetSessionAsEmailVerified(session.token);

    return c.body(null, 204);
});

export default verifyEmailRoute;
