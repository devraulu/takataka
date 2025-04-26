import { Env, Hono } from 'hono';
import 'dotenv/config';
import authMiddleware from './server/middlewares/auth';
import rateLimitMiddleware from './server/middlewares/rate-limit';
import vikeHandler from './server/vike-handler';

const app = new Hono<Env>();

app.use(authMiddleware, rateLimitMiddleware);

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all('*', vikeHandler);

export default app;
