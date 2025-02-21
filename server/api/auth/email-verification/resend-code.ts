import Env from '#root/server/env';
import {
    getSessionEmailVerificationRequest,
    sendVerificationEmail,
    userVerificationEmailRateLimit,
} from '#root/server/lib/email-verification';
import { Hono } from 'hono';

const resendCodeRoute = new Hono<Env>();

resendCodeRoute.post('/', async c => {
    if (c.var.session == null || c.var.user == null) {
        return c.text('Unauthorized', 401);
    }
    if (c.var.user.registered2fa && !c.var.session.twoFactorVerified) {
        return c.text('Forbidden', 403);
    }

    const verificationRequest = await getSessionEmailVerificationRequest(
        c.var.session.token,
    );

    if (verificationRequest === null) {
        return c.text('Forbidden', 403);
    }

    if (!userVerificationEmailRateLimit.consume(c.var.session.userId, 1)) {
        return c.text('Too many requests', 429);
    }

    await sendVerificationEmail(
        verificationRequest.email,
        verificationRequest.code,
    );

    return c.body(null, 201);
});

export default resendCodeRoute;
