import { type GetServerSidePropsContext } from 'next';
import { TokenBucketRateLimit } from './rate-limit';

export const globalRateLimit = new TokenBucketRateLimit<string>(100, 1);

export function globalGETRateLimit(c: GetServerSidePropsContext): boolean {
    // TODO: Assumes X-Forwarded-For will always be defined.

    const clientIP = c.req.headers['X-Forwarded-For'];

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
