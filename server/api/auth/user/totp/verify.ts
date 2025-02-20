import Env from '#root/server/env';
import { userTOTPVerificationRateLimit } from '#root/server/lib/2fa';
import { getUserTOTPKey } from '#root/server/lib/user';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';
import { verifyTOTP } from '@oslojs/otp';
import { setSessionAs2FAVerified } from '#root/server/lib/session';

const verifyToptRoute = new Hono<Env>();

verifyToptRoute.post('/', async c => {
    if (c.var.session === null || c.var.user === null) {
        return c.json('Unauthorized', 401);
    }
    if (!c.var.user.registered2fa || c.var.session.twoFactorVerified) {
        return c.json('Forbidden', 403);
    }

    if (!userTOTPVerificationRateLimit.check(c.var.user.id, 1)) {
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
        return c.json('Enter your code', 400);
    }
    if (!userTOTPVerificationRateLimit.consume(c.var.user.id, 1)) {
        return c.json('Too many requests', 429);
    }
    const totpKey = await getUserTOTPKey(c.var.user.id);
    if (totpKey === null) {
        return c.json('Forbidden', 403);
    }
    if (!verifyTOTP(totpKey, 30, 6, code)) {
        return c.json('Invalid code', 400);
    }
    userTOTPVerificationRateLimit.reset(c.var.user.id);
    setSessionAs2FAVerified(c.var.session.id);
    return new Response(null, { status: 204 });
});

export default verifyToptRoute;
