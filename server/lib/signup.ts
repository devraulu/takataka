import { Context } from 'hono';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { generateRandomOTP, generateRandomRecoveryCode } from './utils';
import { hashPassword } from './password';
import { db } from '#root/database/dialect';
import { getCookie, setCookie } from 'hono/cookie';
import { encryptString } from './encryption';
import { Counter, TokenBucketRateLimit } from '#root/server/lib/rate-limit';
import { UserResponse } from './user';

export const signupSessionEmailVerificationCounter = new Counter<string>(5);
export const ipSendSignupVerificationEmailRateLimit =
    new TokenBucketRateLimit<string>(5, 60 * 5);

// export async function createSignUpSession(
//     token: string,
//     email: string,
//     username: string,
//     password: string,
// ): Promise<SignUpSession> {
//     const encodedToken = encodeHexLowerCase(
//         sha256(new TextEncoder().encode(token)),
//     );
//     const emailVerificationCode = generateRandomOTP();
//     const passwordHash = await hashPassword(password);
//
//     const session: SignUpSession = {
//         token: encodedToken,
//         expiresAt: new Date(Date.now() + 1000 * 60 * 10),
//         email,
//         username,
//         passwordHash,
//     };
//
//     await db.insertInto('signupSession').values(session).executeTakeFirst();
//
//     return session;
// }

// export async function validateSignUpSessionToken(
// token: string,
// ): Promise<SignUpSession | null> {
//     const encodedToken = encodeHexLowerCase(
//         sha256(new TextEncoder().encode(token)),
//     );
//
//     const session = await db
//         .selectFrom('signupSession')
//         .where('token', '=', encodedToken)
//         .selectAll()
//         .executeTakeFirst();
//
//     if (!session) return null;
//
//     if (Date.now() >= session.expiresAt.getTime()) {
//         await db
//             .deleteFrom('signupSession')
//             .where('id', '=', session.id)
//             .executeTakeFirst();
//         return null;
//     }
//
//     return session;
// }

// export async function invalidateSignUpSession(token: string): Promise<void> {
//     await db
//         .deleteFrom('signupSession')
//         .where('token', '=', token)
//         .executeTakeFirst();
// }

// export async function validateSignUpSessionRequest(
//     c: Context,
// ): Promise<SignUpSession | null> {
//     const token = getCookie(c, 'signup_session');
//     if (!token) return null;
//
//     const session = await validateSignUpSessionToken(token);
//
//     if (!session) {
//         deleteSignUpSessionTokenCookie(c);
//     }
//
//     return session;
// }

export async function createUser(
    email: string,
    username: string,
    password: string,
): Promise<UserResponse> {
    const passwordHash = await hashPassword(password);
    const recoveryCode = generateRandomRecoveryCode();
    const encryptedRecoveryCode = await encryptString(recoveryCode);

    const newUser = await db
        .insertInto('appUser')
        .values({
            email,
            username,
            passwordHash,
            recoveryCode: encryptedRecoveryCode,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

    const user: UserResponse = {
        ...newUser,
        registered2fa: false,
    };

    return user;
}

// export function setSignUpSessionTokenCookie(
//     c: Context,
//     token: string,
// expiresAt: Date,
// ): void {
//     setCookie(c, 'signup_session', token, {
//         expires: expiresAt,
//         sameSite: 'lax',
//         httpOnly: true,
//         path: '/',
//         secure: process.env.NODE_ENV === 'production',
//     });
// }
//
// export function deleteSignUpSessionTokenCookie(c: Context): void {
//     setCookie(c, 'signup_session', '', {
//         maxAge: 0,
//         sameSite: 'lax',
//         httpOnly: true,
//         path: '/',
//         secure: process.env.NODE_ENV === 'production',
//     });
// }

export async function sendSignUpEmail(
    email: string,
    code: string,
): Promise<void> {
    console.log(`To ${email}: Your sign up code is ${code}`);
}

export interface SignUpSession {
    token: string;
    email: string;
    username: string;
    passwordHash: string;
    emailVerificationCode: string;
    expiresAt: Date;
}
