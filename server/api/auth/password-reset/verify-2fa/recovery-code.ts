import {
    resetUser2FAWithRecoveryCode,
    userRecoveryCodeVerificationRateLimit,
} from '#root/server/lib/2fa';
import { validatePasswordResetSessionRequest } from '#root/server/lib/password-reset';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';

const recoveryCodeRoute = new Hono();

recoveryCodeRoute.post('/', async c => {
    const { session, user } = await validatePasswordResetSessionRequest(c);

    if (session == null) {
        return c.text('Not authenticated', 401);
    }
    if (
        !session.emailVerified ||
        !user.registered2fa ||
        session.twoFactorVerified
    ) {
        return c.text('Forbidden', 403);
    }
    if (!userRecoveryCodeVerificationRateLimit.check(session.userId, 1)) {
        return c.text('Too many requests', 429);
    }

    const data: unknown = await c.req.json();
    const parser = new ObjectParser(data);
    let code: string;
    try {
        code = parser.getString('code');
    } catch {
        return c.text('Invalid or missing fields', 400);
    }
    if (code === '') {
        return c.text('Please enter your code', 400);
    }
    if (!userRecoveryCodeVerificationRateLimit.consume(session.userId, 1)) {
        return c.text('Too many requests', 429);
    }
    try {
        await resetUser2FAWithRecoveryCode(session.userId, code);
    } catch {
        return c.text('Invalid code', 400);
    }

    userRecoveryCodeVerificationRateLimit.reset(session.userId);

    return c.body(null, 204);
});

export default recoveryCodeRoute;
