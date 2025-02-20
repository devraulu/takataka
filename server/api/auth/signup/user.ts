import { ObjectParser } from '@pilcrowjs/object-parser';
import {
    createUserWithSignUpSession,
    invalidateSignUpSession,
    signupSessionEmailVerificationCounter,
    validateSignUpSessionRequest,
} from '#root/server/lib/signup-session';
import { Hono } from 'hono';
import { constantTimeEqualString } from '#root/server/lib/utils';
import {
    createSession,
    deleteSessionTokenCookie,
    generateSessionToken,
    SessionFlags,
    setSessionTokenCookie,
} from '#root/server/lib/session';

const userRoute = new Hono();

userRoute.post('/', async c => {
    const signupSession = await validateSignUpSessionRequest(c);
    if (!signupSession) {
        return c.json('Unauthorized', 401);
    }

    const data = await c.req.json();
    const parser = new ObjectParser(data);

    let code: string;
    try {
        code = parser.getString('code');
    } catch {
        return c.json('Invalid or missing fields', 400);
    }

    if (code === '') {
        return c.json('Enter a code', 400);
    }

    if (
        !signupSessionEmailVerificationCounter.increment(
            signupSession.sessionId,
        )
    ) {
        await invalidateSignUpSession(signupSession.sessionId);
        return c.json('Too many requests', 429);
    }
    if (!constantTimeEqualString(signupSession.emailVerificationCode, code)) {
        return c.json('Invalid code', 400);
    }
    const user = await createUserWithSignUpSession(signupSession.sessionId);
    deleteSessionTokenCookie(c);

    const flags: SessionFlags = { twoFactorVerified: false };
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id, flags);
    setSessionTokenCookie(c, sessionToken, session.expiresAt);

    return c.body(null, 204);
});

export default userRoute;
