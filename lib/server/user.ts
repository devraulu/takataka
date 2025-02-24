import { db } from '#root/database/dialect';
import { User } from '#root/database/types/user';
import { randomInt } from 'crypto';
import { BasicRateLimit } from './rate-limit';
import { UserResponse } from './session';
import { generate } from 'random-words';
import { pascalCase } from '../utils/words';

export const userLoginRateLimit = new BasicRateLimit<number>(10, 60 * 10);

export function verifyUsernameInput(username: string): boolean {
    return (
        username.length > 3 &&
        username.length < 32 &&
        username.trim() === username &&
        /^[a-zA-Z0-9_.]+$/.test(username)
    );
}

export async function getUserFromEmail(
    email: string,
): Promise<UserResponse | null> {
    const row = await db
        .selectFrom('appUser')
        .where('email', '=', email)
        .selectAll()
        .executeTakeFirst();

    if (row == null) return null;

    return row;
}

export async function getUserFromGoogleId(
    googleId: string,
): Promise<User | null> {
    const row = await db
        .selectFrom('appUser')
        .where('googleId', '=', googleId)
        .selectAll()
        .executeTakeFirst();

    if (row == null) return null;

    return row;
}

export async function generateUniqueUsername() {
    const getCombination = () =>
        generate({
            join: '',
            exactly: 3,
            formatter: pascalCase,
        }) + randomInt(4);

    let username = getCombination();

    while (
        (await db
            .selectFrom('appUser')
            .where('username', '=', username)
            .executeTakeFirst()) != null
    ) {
        username = getCombination();
    }

    return username;
}

export async function createUser(
    googleId: string,
    email: string,
    picture?: string,
): Promise<UserResponse> {
    const username = await generateUniqueUsername();

    return await db
        .insertInto('appUser')
        .values({
            email,
            username,
            googleId,
            picture,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
}
