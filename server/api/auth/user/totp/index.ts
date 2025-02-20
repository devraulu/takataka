import Env from '#root/server/env';
import { Hono } from 'hono';
import verifyToptRoute from './verify';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { decodeBase64 } from '@oslojs/encoding';
import { verifyTOTP } from '@oslojs/otp';
import { setSessionAs2FAVerified } from '#root/server/lib/session';
import { updateUserTOTPKey } from '#root/server/lib/user';

const totpRoute = new Hono<Env>();

totpRoute.get('/', async c => {
    if (c.var.session === null || c.var.user === null) {
        return c.json('Unauthorized', 401);
    }
    if (c.var.user.registered2fa && !c.var.session.twoFactorVerified) {
        return c.json('Forbidden', 403);
    }

    const data = await c.req.json();
    const parser = new ObjectParser(data);
    let encodedKey: string, code: string;
    try {
        encodedKey = parser.getString('key');
        code = parser.getString('code');
    } catch {
        return c.json('Invalid or missing fields', 400);
    }
    if (code === '') {
        return c.json('Enter your code', 400);
    }
    if (encodedKey.length !== 28) {
        return c.json('Invalid key', 400);
    }
    let key: Uint8Array;
    try {
        key = decodeBase64(encodedKey);
    } catch {
        return c.json('Invalid key', 400);
    }
    if (key.byteLength !== 20) {
        return c.json('Invalid key', 400);
    }
    if (!verifyTOTP(key, 30, 6, code)) {
        return new Response('Invalid code', {
            status: 400,
        });
    }

    updateUserTOTPKey(c.var.session.userId, key);
    setSessionAs2FAVerified(c.var.session.id);
    return new Response(null, { status: 204 });
});

totpRoute.route('/verify', verifyToptRoute);

export default totpRoute;
