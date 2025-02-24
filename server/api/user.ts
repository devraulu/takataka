import CookiesEnum from '#root/lib/server/enum';
import { validateSessionToken } from '#root/lib/server/session';
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';

const userRoute = new Hono();

userRoute.get('/profile', async c => {
    console.log('api/user/profile -->');

    const token = getCookie(c, CookiesEnum.SESSION);

    console.log('token', token);

    if (token == null) {
        return c.text('Not logged in', 401);
    }

    const { user } = await validateSessionToken(token);

    console.log('user', user);

    if (user == null) {
        return c.text('Not logged in', 401);
    }

    return c.json(user);
});

export default userRoute;
