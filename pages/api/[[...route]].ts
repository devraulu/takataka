import authRoute from '#root/server/api/auth';
import Env from '#root/server/env';
import authMiddleware from '#root/server/middlewares/auth';
import rateLimitMiddleware from '#root/server/middlewares/rate-limit';
import { Hono } from 'hono';
import { handle } from '@hono/node-server/vercel';
import type { PageConfig } from 'next';
import userRoute from '#root/server/api/user';

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

const app = new Hono<Env>().basePath('/api');

app.use(authMiddleware, rateLimitMiddleware);

app.route('/auth', authRoute);
app.route('/user', userRoute);

export default handle(app);
