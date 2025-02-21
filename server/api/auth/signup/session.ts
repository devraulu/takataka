import { ObjectParser } from '@pilcrowjs/object-parser';
import {
    createSignUpSession,
    ipSendSignupVerificationEmailRateLimit,
    setSignUpSessionTokenCookie,
} from '#root/server/lib/signup-session';
import { Hono } from 'hono';
import {
    deleteSessionTokenCookie,
    generateSessionToken,
    invalidateSession,
} from '#root/server/lib/session';
import {
    ipPasswordHashRateLimit,
    verifyPasswordStrength,
} from '#root/server/lib/password';
import {
    checkEmailAvailability,
    verifyEmailInput,
} from '#root/server/lib/email';
import { verifyUsernameInput } from '#root/server/lib/user';
import { sendVerificationEmail } from '#root/server/lib/email-verification';
import Env from '#root/server/env';

const sessionRoute = new Hono<Env>();

sessionRoute.post('/', async c => {
    const clientIP = c.req.header('X-Forwarded-For');

    if (clientIP && !ipPasswordHashRateLimit.check(clientIP, 1)) {
        return c.text('Too many requests', 429);
    }

    if (
        clientIP &&
        !ipSendSignupVerificationEmailRateLimit.check(clientIP, 1)
    ) {
        return c.text('Too many requests', 429);
    }

    const data = await c.req.json();
    const parser = new ObjectParser(data);

    let email, password, username;
    try {
        email = parser.getString('email');
        password = parser.getString('password');
        username = parser.getString('username');
    } catch {
        return c.text('Invalid or missing fields', 400);
    }

    if (!email || !password || !username) {
        return c.text('Please enter your username, email and password', 400);
    }

    if (!verifyEmailInput(email)) {
        return c.text('Invalid email', 400);
    }
    if ((await checkEmailAvailability(email)) === false) {
        return c.text('Email already in use', 400);
    }

    if (!verifyUsernameInput(username)) {
        return c.text('Invalid username', 400);
    }

    const strongPassword = await verifyPasswordStrength(password);
    if (!strongPassword) {
        return c.text('Weak password', 400);
    }
    if (clientIP && !ipPasswordHashRateLimit.consume(clientIP, 1)) {
        return c.text('Too many requests', 429);
    }

    if (
        clientIP &&
        !ipSendSignupVerificationEmailRateLimit.consume(clientIP, 1)
    ) {
        return c.text('Too many requests', 429);
    }

    const sessionToken = generateSessionToken();
    const session = await createSignUpSession(
        sessionToken,
        email,
        username,
        password,
    );

    await sendVerificationEmail(session.email, session.emailVerificationCode);

    setSignUpSessionTokenCookie(c, sessionToken, session.expiresAt);

    c.redirect('/2fa/setup', 307);
    // return c.body(null, 204);
});

sessionRoute.delete('/', async c => {
    if (c.var.session == null) {
        return c.text('Not authenticated', 401);
    }

    await invalidateSession(c.var.session.token);

    deleteSessionTokenCookie(c);
    return c.body(null, 204);
});

export default sessionRoute;
