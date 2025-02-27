import { type GetServerSidePropsContext } from 'next';
import { TokenBucketRateLimit } from './rate-limit';
import { Context } from 'hono';

export const globalRateLimit = new TokenBucketRateLimit<string>(100, 1);

export function globalGETRateLimit(
    c: Context | GetServerSidePropsContext,
): boolean {
    // TODO: Assumes X-Forwarded-For will always be defined.

    const clientIP =
        (c as Context).header !== undefined
            ? (c as Context).header('X-Forwarded-For')
            : (c as GetServerSidePropsContext).req.headers['X-Forwarded-For'];

    if (clientIP == null || typeof clientIP !== 'string') {
        return true;
    }

    return globalRateLimit.consume(clientIP, 1);
}

export function globalPOSTRateLimit(c: GetServerSidePropsContext): boolean {
    // TODO: Assumes X-Forwarded-For will always be defined.

    const clientIP = c.req.headers['X-Forwarded-For'];

    if (clientIP == null || typeof clientIP !== 'string') {
        return true;
    }
    return globalRateLimit.consume(clientIP, 3);
}
