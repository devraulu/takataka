import 'server-only';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha1 } from '@oslojs/crypto/sha1';
import { BasicRateLimit, TokenBucketRateLimit } from './rate-limit';
// import {} from 'argon2-browser/';
// import argon2 from 'argon2';
import argon2 from '@node-rs/argon2';

export const ipPasswordHashRateLimit = new TokenBucketRateLimit(5, 30);
export const userUpdatePasswordRateLimit = new BasicRateLimit<number>(
    5,
    60 * 10,
);

export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });
}

export async function verifyPasswordHash(
    hash: string,
    password: string,
): Promise<boolean> {
    return argon2.verify(hash, password);
}

export async function verifyPasswordStrength(
    password: string,
): Promise<boolean> {
    if (password.length < 8 || password.length > 255) {
        return false;
    }

    const hash = encodeHexLowerCase(sha1(new TextEncoder().encode(password)));
    const prefix = hash.slice(0, 5);

    const response = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`,
    );

    const data = await response.text();
    const items = data.split('\n');

    for (const item of items) {
        const suffix = item.slice(0, 35).toLowerCase();
        if (hash == prefix + suffix) {
            return false;
        }
    }
    return true;
}
