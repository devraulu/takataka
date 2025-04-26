import {
    encodeBase32LowerCaseNoPadding,
    encodeHexLowerCase,
} from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { NewSession, Session } from '#root/database/types/session';
import { db } from '#root/database/dialect';
import { Context } from 'hono';
import { setCookie } from 'hono/cookie';
import { UserResponse } from './user';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

export function generateSessionToken(): string {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes).toLowerCase();
    return token;
    // or
    // return crypto.randomUUID();
}

export async function createSession(
    token: string,
    userId: number,
    flags: SessionFlags,
): Promise<Session> {
    try {
        const encodedToken = encodeHexLowerCase(
            sha256(new TextEncoder().encode(token)),
        );

        const newSession: NewSession = {
            token: encodedToken,
            userId,
            expiresAt: new Date(
                Date.now() + 1000 * 60 * 60 * 24 * 30,
            ).toISOString(),
            twoFactorVerified: flags.twoFactorVerified,
        };

        const session = await db
            .insertInto('userSession')
            .values(newSession)
            .returningAll()
            .executeTakeFirstOrThrow();

        return session;
    } catch (e) {
        console.error("Couldn't create session", e);
        throw e;
    }
}

export async function validateSessionToken(
    sessionToken: string,
): Promise<SessionValidationResult> {
    try {
        const encodedToken = encodeHexLowerCase(
            new TextEncoder().encode(sessionToken),
        );

        const queryResult = await db
            .selectFrom('userSession')
            .innerJoin('appUser', 'appUser.id', 'userSession.userId')
            .selectAll('userSession')
            .select(eb => [
                jsonObjectFrom(eb.selectFrom('appUser').selectAll()).as('user'),
            ])
            .where('userSession.token', '=', encodedToken)
            .executeTakeFirst();

        if (queryResult == null || queryResult.user == null)
            return { session: null, user: null };

        const {
            userId,
            twoFactorVerified,
            id,
            token,
            user: { email, expiresAt, username, totpKey, id: uid },
        } = queryResult;

        const session: SessionResponse = {
            token,
            expiresAt,
            id,
            twoFactorVerified,
            userId,
        };

        const user: UserResponse = {
            id: uid,
            email,
            registered2fa: Boolean(totpKey),
            username,
        };

        if (Date.now() >= session.expiresAt.getTime()) {
            await db
                .deleteFrom('userSession')
                .where('userSession.id', '=', session.id)
                .execute();

            return { session: null, user: null };
        }

        // If the session has 15 days or less left, extend it
        if (
            Date.now() >=
            session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
        ) {
            session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

            await db
                .updateTable('userSession')
                .set({
                    expiresAt: session.expiresAt,
                })
                .where('token', '=', encodedToken)
                .executeTakeFirstOrThrow();
        }

        return { session, user };
    } catch (e) {
        console.error('Could not validate session token', e);
        throw e;
    }
}

export async function invalidateSession(sessionToken: string): Promise<void> {
    await db
        .deleteFrom('userSession')
        .where('token', '=', sessionToken)
        .execute();
}

export async function invalidateAllSessions(userId: number): Promise<void> {
    await db.deleteFrom('userSession').where('userId', '=', userId).execute();
}

export function setSessionTokenCookie(
    c: Context,
    token: string,
    expires: Date,
) {
    setCookie(c, 'session', token, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires,
    });
}

export function deleteSessionTokenCookie(c: Context): void {
    setCookie(c, 'session', '', {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
    });
}

export function setSessionAs2FAVerified(sessionToken: string): void {
    db.updateTable('userSession')
        .where('token', '=', sessionToken)
        .set({
            twoFactorVerified: true,
        })
        .execute();
}

export interface SessionFlags {
    twoFactorVerified: boolean;
}

export interface SessionResponse extends SessionFlags, Session {}

export type SessionValidationResult =
    | { session: SessionResponse; user: UserResponse }
    | { session: null; user: null };
