import { createMiddleware } from 'hono/factory';
import { globalRateLimit } from '../../lib/server/request';

const rateLimitMiddleware = createMiddleware(async (c, next) => {
    // TODO: Assumes X-Forwarded-For will always be defined.
    const clientIP = c.req.header('X-Forwarded-For');

    if (clientIP != null) {
        const cost = ['GET', 'OPTIONS'].includes(c.req.method) ? 1 : 3;

        if (!globalRateLimit.consume(clientIP, cost)) {
            return c.text('Too many requests', 429);
        }
    }

    await next();
});

export default rateLimitMiddleware;
