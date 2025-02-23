import Env from '#root/server/env';
import { Hono } from 'hono';
import verifyToptRoute from './verify';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { decodeBase64 } from '@oslojs/encoding';
import { verifyTOTP } from '@oslojs/otp';
import { setSessionAs2FAVerified } from '#root/server/lib/session';
import { updateUserTOTPKey } from '#root/server/lib/user';

const totpRoute = new Hono<Env>();

totpRoute.post('/', async c => {
    if (c.var.session === null || c.var.user === null) {
        return c.text('Unauthorized', 401);
    }
    if (c.var.user.registered2fa && !c.var.session.twoFactorVerified) {
        return c.text('Forbidden', 403);
    }

    const data = await c.req.json();
    const parser = new ObjectParser(data);
    let encodedKey: string, code: string;
    try {
        encodedKey = parser.getString('key');
        code = parser.getString('code');
    } catch {
        return c.text('Invalid or missing fields', 400);
    }
    if (code === '') {
        return c.text('Enter your code', 400);
    }
    if (encodedKey.length !== 28) {
        return c.text('Invalid key', 400);
    }
    let key: Uint8Array;
    try {
        key = decodeBase64(encodedKey);
    } catch {
        return c.text('Invalid key', 400);
    }
    if (key.byteLength !== 20) {
        return c.text('Invalid key', 400);
    }
    if (!verifyTOTP(key, 30, 6, code)) {
        return c.text('Invalid code', 400);
    }

    updateUserTOTPKey(c.var.session.userId, key);
    setSessionAs2FAVerified(c.var.session.token);

    return c.body(null, 204);
});

totpRoute.route('/verify', verifyToptRoute);

export default totpRoute;
