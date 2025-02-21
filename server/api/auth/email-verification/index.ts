import Env from '#root/server/env';
import {
    checkEmailAvailability,
    verifyEmailInput,
} from '#root/server/lib/email';
import {
    createSessionEmailVerificationRequest,
    sendVerificationEmail,
    userVerificationEmailRateLimit,
} from '#root/server/lib/email-verification';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';
import resendCodeRoute from './resend-code';
import verifyRoute from './verify';

const emailVerificationRoute = new Hono<Env>();

emailVerificationRoute.post('/', async c => {
    if (c.var.session === null || c.var.user === null) {
        return c.text('Unauthorized', 401);
    }
    if (c.var.user.registered2fa && !c.var.session.twoFactorVerified) {
        return c.text('Forbidden', 403);
    }
    if (!userVerificationEmailRateLimit.check(c.var.user.id, 1)) {
        return c.text('Too many requests', 429);
    }

    const data: unknown = await c.req.json();
    const parser = new ObjectParser(data);
    let email: string;
    try {
        email = parser.getString('email').toLowerCase();
    } catch {
        return c.text('Invalid or missing fields', 400);
    }

    if (email === '') {
        return c.text('Please enter your email', 400);
    }

    if (!verifyEmailInput(email)) {
        return c.text('Invalid email', 400);
    }
    const emailAvailable = await checkEmailAvailability(email);
    if (!emailAvailable) {
        return c.text('This email is already used', 400);
    }
    if (!userVerificationEmailRateLimit.consume(c.var.user.id, 1)) {
        return c.text('Too many requests', 429);
    }
    const verificationRequest = await createSessionEmailVerificationRequest(
        c.var.session.token,
        email,
    );
    sendVerificationEmail(verificationRequest.email, verificationRequest.code);

    return c.body(null, 201);
});

emailVerificationRoute.route('/resend-code', resendCodeRoute);
emailVerificationRoute.route('/verify', verifyRoute);

export default emailVerificationRoute;
