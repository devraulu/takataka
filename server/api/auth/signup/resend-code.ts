import { sendVerificationEmail } from '#root/server/lib/email-verification';
import {
    ipSendSignupVerificationEmailRateLimit,
    validateSignUpSessionRequest,
} from '#root/server/lib/signup-session';
import { Hono } from 'hono';

const resendCodeRoute = new Hono();

resendCodeRoute.post('/', async c => {
    // TODO: Assumes IP is provided
    const clientIP = c.req.header('X-Forwarded-For');

    const session = await validateSignUpSessionRequest(c);
    if (session == null) {
        return c.json('Unauthorized', 401);
    }

    if (
        clientIP != null &&
        !ipSendSignupVerificationEmailRateLimit.consume(clientIP, 1)
    ) {
        return c.json('Too many requests', 429);
    }

    sendVerificationEmail(session.email, session.emailVerificationCode);

    return c.body(null, 201);
});

export default resendCodeRoute;
