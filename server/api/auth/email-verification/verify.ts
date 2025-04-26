import Env from '#root/server/env';
import {
    deleteSessionEmailVerificationRequest,
    deleteUserEmailVerificationRequests,
    getSessionEmailVerificationRequest,
    sessionEmailVerificationCounter,
} from '#root/server/lib/email-verification';
import { invalidateUserPasswordResetSessions } from '#root/server/lib/password-reset';
import { updateUserEmail } from '#root/server/lib/user';
import { constantTimeEqualString } from '#root/server/lib/utils';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { Hono } from 'hono';

const verifyRoute = new Hono<Env>();

verifyRoute.post('/', async c => {
    if (c.var.session === null || c.var.user === null) {
        return c.json('Unathorized', 401);
    }
    if (c.var.user.registered2fa && !c.var.session.twoFactorVerified) {
        return c.json('Forbidden', 403);
    }

    const verificationRequest = await getSessionEmailVerificationRequest(
        c.var.session.id,
    );

    if (verificationRequest === null) {
        return c.json('Forbidden', 403);
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
        return c.json('Enter your code', 400);
    }
    if (
        !sessionEmailVerificationCounter.increment(
            verificationRequest.sessionId,
        )
    ) {
        await deleteSessionEmailVerificationRequest(
            verificationRequest.sessionId,
        );
        return c.json('Too many requests', 429);
    }
    if (!constantTimeEqualString(verificationRequest.code, code)) {
        return c.json('Incorrect code', 400);
    }

    await deleteUserEmailVerificationRequests(c.var.user.id);
    await invalidateUserPasswordResetSessions(c.var.user.id);

    await updateUserEmail(c.var.user.id, verificationRequest.email);

    return c.body(null, 204);
});

export default verifyRoute;
