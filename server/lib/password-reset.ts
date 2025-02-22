import { db } from '#root/database/dialect';
import { Context } from 'hono';
import { BasicRateLimit, TokenBucketRateLimit } from './rate-limit';
import { getCookie, setCookie } from 'hono/cookie';
import {
    NewPasswordResetSession,
    PasswordResetSession,
} from '#root/database/types/password-reset-session';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { generateRandomOTP } from './utils';
import { hashPassword } from './password';
import { UserResponse } from './user';

export const ipPasswordResetRateLimit = new TokenBucketRateLimit<string>(
    3,
    60 * 10,
);
export const userPasswordResetRateLimit = new TokenBucketRateLimit<number>(
    3,
    60 * 10,
);
export const userPasswordResetVerificationRateLimit =
    new BasicRateLimit<number>(5, 60 * 15);

export async function createPasswordResetSession(
    token: string,
    userId: number,
    email: string,
): Promise<PasswordResetSessionWithVerificationCode> {
    const encodedToken = encodeHexLowerCase(
        sha256(new TextEncoder().encode(token)),
    );
    const code = generateRandomOTP();
    const codeHash = await hashPassword(code);

    const session: NewPasswordResetSession = {
        token: encodedToken,
        userId,
        email,
        expiresAt: new Date(Date.now() + 1000 * 60 * 10).toString(),
        emailVerificationCodeHash: codeHash,
        emailVerified: false,
        twoFactorVerified: false,
    };

    const result = await db
        .insertInto('passwordResetSession')
        .values({
            ...session,
        })
        .returning('id')
        .executeTakeFirstOrThrow();

    return {
        token,
        userId,
        email,
        expiresAt: new Date(session.expiresAt),
        emailVerificationCode: code,
        emailVerified: false,
        twoFactorVerified: false,
        id: result.id,
    };
}

export async function validatePasswordResetSessionToken(
    token: string,
): Promise<PasswordResetSessionValidationResult> {
    const encodedToken = encodeHexLowerCase(
        sha256(new TextEncoder().encode(token)),
    );

    const row = await db
        .selectFrom('passwordResetSession')
        .innerJoin('appUser', 'appUser.id', 'passwordResetSession.userId')
        .where('passwordResetSession.token', '=', encodedToken)
        .select([
            'appUser.id as id',
            'email',
            'emailVerified',
            'expiresAt',
            'twoFactorVerified',
            'userId',
            'totpKey',
            'username',
        ])
        .executeTakeFirst();

    if (row == null) {
        return { session: null, user: null };
    }

    const session: PasswordResetSessionWithoutCodeHash = {
        id: row.id,
        email: row.email,
        userId: row.userId,
        expiresAt: row.expiresAt,
        emailVerified: row.emailVerified,
        twoFactorVerified: row.twoFactorVerified,
        token,
    };

    const user: UserResponse = {
        id: row.userId,
        email: row.email,
        username: row.username,
        registered2fa: row.totpKey != null,
        emailVerified: row.emailVerified,
    };

    if (Date.now() > session.expiresAt.getTime()) {
        await db
            .deleteFrom('passwordResetSession')
            .where('id', '=', session.id)
            .execute();
        return { session: null, user: null };
    }

    return { session, user };
}

export async function getPasswordResetSessionEmailVerificationCodeHash(
    token: string,
) {
    const row = await db
        .selectFrom('passwordResetSession')
        .where('token', '=', token)
        .select(['emailVerificationCodeHash'])
        .executeTakeFirst();

    if (row == null) {
        return null;
    }

    return row.emailVerificationCodeHash;
}

export async function setPasswordResetSessionAsEmailVerified(
    token: string,
): Promise<void> {
    await db
        .updateTable('passwordResetSession')
        .set({ emailVerified: true })
        .where('token', '=', token)
        .execute();
}

export async function setPasswordResetSessionAsTwoFactorVerified(
    token: string,
): Promise<void> {
    await db
        .updateTable('passwordResetSession')
        .set({ twoFactorVerified: true })
        .where('token', '=', token)
        .executeTakeFirstOrThrow();
}

export async function invalidateUserPasswordResetSessions(
    userId: number,
): Promise<void> {
    await db
        .deleteFrom('passwordResetSession')
        .where('userId', '=', userId)
        .execute();
}

export async function validatePasswordResetSessionRequest(
    c: Context,
): Promise<PasswordResetSessionValidationResult> {
    const token = getCookie(c, 'password_reset_session');
    if (token == null) {
        return { session: null, user: null };
    }

    const result = await validatePasswordResetSessionToken(token);
    if (result.session == null) {
        await deletePasswordResetSessionTokenCookie(c);
    }

    return result;
}

export function setPasswordResetSessionTokenCookie(
    c: Context,
    token: string,
    expiresAt: Date,
): void {
    setCookie(c, 'password_reset_session', token, {
        expires: expiresAt,
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV != 'development',
    });
}

export async function deletePasswordResetSessionTokenCookie(
    c: Context,
): Promise<void> {
    setCookie(c, 'password_reset_session', '', {
        maxAge: 0,
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV != 'development',
    });
}

export async function sendPasswordResetEmail(
    email: string,
    code: string,
): Promise<void> {
    // TODO: Send email.
    console.log(`To ${email}: Your reset code is ${code}`);
}

export type PasswordResetSessionWithoutCodeHash = Omit<
    PasswordResetSession,
    'emailVerificationCodeHash'
>;

export interface PasswordResetSessionWithVerificationCode
    extends PasswordResetSessionWithoutCodeHash {
    emailVerificationCode: string;
}

export type PasswordResetSessionValidationResult =
    | { session: PasswordResetSessionWithoutCodeHash; user: UserResponse }
    | { session: null; user: null };
