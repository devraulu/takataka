import { userTOTPVerificationRateLimit } from '#root/server/lib/2fa';
import {
    setPasswordResetSessionAsTwoFactorVerified,
    validatePasswordResetSessionRequest,
} from '#root/server/lib/password-reset';
import { getUserTOTPKey } from '#root/server/lib/user';
import { verifyTOTP } from '@oslojs/otp';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';

const totpRoute = new Hono();

totpRoute.post('/', async c => {
    const { session, user } = await validatePasswordResetSessionRequest(c);
    if (session == null) {
        return c.json('Not authenticated', 401);
    }
    if (
        !session.emailVerified ||
        !user.registered2fa ||
        session.twoFactorVerified
    ) {
        return c.json('Forbidden', 403);
    }
    if (!userTOTPVerificationRateLimit.check(session.userId, 1)) {
        return c.json('Too many requests', 429);
    }

    const data: unknown = await c.req.json();
    const parser = new ObjectParser(data);

    let code: string;
    try {
        code = parser.getString('code');
    } catch {
        return c.json('Invalid or missing fields', 400);
    }

    if (code === '') {
        return c.json('Please enter your code', 400);
    }

    const totpKey = await getUserTOTPKey(session.userId);

    if (totpKey === null) {
        return c.json('Forbidden', 403);
    }

    if (!userTOTPVerificationRateLimit.consume(session.userId, 1)) {
        return c.json('Too many requests', 429);
    }
    if (!verifyTOTP(totpKey, 30, 6, code)) {
        return c.json('Invalid code', 400);
    }
    userTOTPVerificationRateLimit.reset(session.userId);

    try {
        await setPasswordResetSessionAsTwoFactorVerified(session.token);
    } catch {
        return c.json('Invalid code', 400);
    }

    return c.body(null, 204);
});

export default totpRoute;
