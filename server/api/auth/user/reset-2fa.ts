import Env from '#root/server/env';
import {
    resetUser2FAWithRecoveryCode,
    userRecoveryCodeVerificationRateLimit,
} from '#root/server/lib/2fa';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';

const reset2FARoute = new Hono<Env>();

reset2FARoute.patch('/', async c => {
    const session = c.var.session;
    const user = c.var.user;

    if (session == null || user == null) {
        return c.text('Forbidden', 403);
    }

    if (!user.registered2fa) {
        return c.text('Forbidden', 403);
    }
    if (!userRecoveryCodeVerificationRateLimit.check(user.id, 1)) {
        return c.text('Invalid recovery code', 429);
    }

    const data: unknown = await c.req.json();
    const parser = new ObjectParser(data);
    let code: string;
    try {
        code = parser.getString('code');
    } catch {
        return c.text('Please enter your code', 400);
    }
    if (code === '') {
        return c.text('Invalid recovery code', 400);
    }
    if (!userRecoveryCodeVerificationRateLimit.consume(user.id, 1)) {
        return c.text('Invalid recovery code', 400);
    }
    const valid = resetUser2FAWithRecoveryCode(user.id, code);
    if (!valid) {
        return c.text('Invalid recovery code', 400);
    }

    userRecoveryCodeVerificationRateLimit.reset(user.id);

    return c.body(null, 204);
});

export default reset2FARoute;
