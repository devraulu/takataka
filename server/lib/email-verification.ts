import { db } from '#root/database/dialect';
import { SessionEmailVerificationRequest } from '#root/database/types/session-email-verification-request';
import { Context } from 'hono';
import { Counter, TokenBucketRateLimit } from './rate-limit';
import { generateRandomOTP } from './utils';
import { setCookie } from 'hono/cookie';

export const sessionEmailVerificationCounter = new Counter<string>(5);
export const userVerificationEmailRateLimit = new TokenBucketRateLimit<number>(
    5,
    60 * 10,
);

export async function createSessionEmailVerificationRequest(
    token: string,
    email: string,
): Promise<SessionEmailVerificationRequest> {
    const code = generateRandomOTP();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

    const result = await db
        .insertInto('sessionEmailVerificationRequest')
        .values({
            token,
            expiresAt: expiresAt.toISOString(),
            email,
            code,
        })
        .onConflict(oc =>
            oc.column('token').doUpdateSet({
                expiresAt: expiresAt.toISOString(),
                email,
                code,
            }),
        )
        .returning('id')
        .executeTakeFirstOrThrow();

    const request: SessionEmailVerificationRequest = {
        id: result.id,
        token,
        code,
        email,
        expiresAt,
    };

    return request;
}

export async function getSessionEmailVerificationRequest(
    token: string,
): Promise<SessionEmailVerificationRequest | null> {
    const row = await db
        .selectFrom('sessionEmailVerificationRequest')
        .where('token', '=', token)
        .selectAll()
        .executeTakeFirst();

    if (row == null) return null;

    if (Date.now() >= row.expiresAt.getTime()) {
        await deleteSessionEmailVerificationRequest(token);
        return null;
    }

    return row;
}

export async function deleteSessionEmailVerificationRequest(
    token: string,
): Promise<void> {
    await db
        .deleteFrom('sessionEmailVerificationRequest')
        .where('token', '=', token)
        .execute();
}

export async function deleteUserEmailVerificationRequests(
    userId: number,
): Promise<void> {
    await db
        .deleteFrom('sessionEmailVerificationRequest')
        .where('token', 'in', cb =>
            cb
                .selectFrom('userSession')
                .select('token')
                .where('userId', '=', userId),
        )
        .execute();
}

export async function sendVerificationEmail(
    email: string,
    code: string,
): Promise<void> {
    console.log(`To ${email}: Your verification code is ${code}`);
}

export function deleteEmailVerificationRequestCookie(c: Context): void {
    setCookie(c, 'email_verification', '', {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
    });
}
