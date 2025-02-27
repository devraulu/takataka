import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import Env from '../env';
import {
    deleteSessionTokenCookie,
    setSessionTokenCookie,
    validateSessionToken,
} from '#root/lib/server/session';
import CookiesEnum from '#root/lib/server/enum';

const authMiddleware = createMiddleware<Env>(async (c, next) => {
    const token = getCookie(c, CookiesEnum.SESSION);

    if (token == null) {
        console.log('token == null');
        c.set('session', null);
        c.set('user', null);
    } else {
        const { session, user } = await validateSessionToken(token);
        if (session != null) {
            setSessionTokenCookie(c, token, session.expiresAt);
        } else {
            deleteSessionTokenCookie(c);
        }

        c.set('session', session);
        c.set('user', user);
    }

    await next();
});

export default authMiddleware;
