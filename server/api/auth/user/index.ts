import { Hono } from 'hono';
import passwordRoute from './password';
import reset2FARoute from './reset-2fa';
import totpRoute from './totp';
import Env from '#root/server/env';
import { resetUserRecoveryCode } from '#root/server/lib/user';

const userRoute = new Hono<Env>();

userRoute.route('/password', passwordRoute);
userRoute.route('/reset-2fa', reset2FARoute);
userRoute.route('/totp', totpRoute);
userRoute.post('/recovery-code/reset', async c => {
    if (c.var.session === null || c.var.user === null) {
        return c.text('Unauthorized', 401);
    }

    if (!c.var.user.registered2fa || c.var.session.twoFactorVerified) {
        return c.text('Forbidden', 403);
    }

    const code = await resetUserRecoveryCode(c.var.session.userId);
    return c.json({ code }, 201);
});

export default userRoute;
