import authApp from '#root/server/api/auth';
import Env from '#root/server/env';
import authMiddleware from '#root/server/middlewares/auth';
import rateLimitMiddleware from '#root/server/middlewares/rate-limit';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import type { PageConfig } from 'next';

export const config: PageConfig = {
    runtime: 'edge',
};

const app = new Hono<Env>().basePath('/api');

app.use(authMiddleware, rateLimitMiddleware);

app.route('/auth', authApp);

export default handle(app);
