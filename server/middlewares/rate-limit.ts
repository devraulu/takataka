import { createMiddleware } from 'hono/factory';
import { TokenBucketRateLimit } from '../lib/rate-limit';

const rateLimit = new TokenBucketRateLimit<string>(100, 1);

const rateLimitMiddleware = createMiddleware(async (c, next) => {
    // TODO: Assumes IP is provided
    const clientIP = c.req.header('X-Forwarded-For');

    if (clientIP != null) {
        const cost = ['GET', 'OPTIONS'].includes(c.req.method) ? 1 : 3;

        if (!rateLimit.consume(clientIP, cost)) {
            return c.json('Too many requests', 429);
        }
    }

    await next();
});

export default rateLimitMiddleware;
