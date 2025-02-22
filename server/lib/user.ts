import { db } from '#root/database/dialect';
import { User } from '#root/database/types/user';
import { decrypt, decryptToString, encrypt, encryptString } from './encryption';
import { hashPassword } from './password';
import { BasicRateLimit } from './rate-limit';
import { generateRandomRecoveryCode } from './utils';

export const userLoginRateLimit = new BasicRateLimit<number>(10, 60 * 10);

export function verifyUsernameInput(username: string): boolean {
    return (
        username.length > 3 &&
        username.length < 32 &&
        username.trim() === username &&
        /^[a-zA-Z0-9_.]+$/.test(username)
    );
}

export async function updateUserPassword(
    userId: number,
    password: string,
): Promise<void> {
    const passwordHash = await hashPassword(password);
    await db.transaction().execute(async tx => {
        await tx
            .deleteFrom('userSession')
            .where('userId', '=', userId)
            .execute();

        await tx
            .updateTable('appUser')
            .set({
                passwordHash,
            })
            .where('id', '=', userId)
            .execute();
    });
}

export async function updateUserEmail(
    userId: number,
    email: string,
): Promise<void> {
    await db
        .updateTable('appUser')
        .set({ email })
        .where('id', '=', userId)
        .execute();
}

export async function getUserPasswordHash(userId: number): Promise<string> {
    const row = await db
        .selectFrom('appUser')
        .where('id', '=', userId)
        .select(['passwordHash'])
        .executeTakeFirst();

    if (row == null) {
        throw new Error('Invalid user');
    }

    return row.passwordHash;
}

export async function getUserRecoveryCode(userId: number): Promise<string> {
    const row = await db
        .selectFrom('appUser')
        .where(eb =>
            eb.and([eb('id', '=', userId), eb('recoveryCode', 'is not', null)]),
        )
        .select(['recoveryCode'])
        .executeTakeFirst();

    if (row == null) {
        throw new Error('Invalid user');
    } else if (row.recoveryCode == null) {
        throw new Error('Recovery code not set');
    }

    return decryptToString(row.recoveryCode);
}

export async function getUserTOTPKey(
    userId: number,
): Promise<Uint8Array | null> {
    const row = await db
        .selectFrom('appUser')
        .where('id', '=', userId)
        .select(['totpKey'])
        .executeTakeFirst();

    if (row == null) {
        throw new Error('Invalid user');
    }
    if (row.totpKey == null) {
        return null;
    }

    return decrypt(row.totpKey);
}

export async function updateUserTOTPKey(
    userId: number,
    key: Uint8Array,
): Promise<void> {
    const encrypted = await encrypt(key);
    await db
        .updateTable('appUser')
        .where('id', '=', userId)
        .set({ totpKey: encrypted })
        .execute();
}

export async function resetUserRecoveryCode(userId: number): Promise<string> {
    const recoveryCode = generateRandomRecoveryCode();
    const encrypted = await encryptString(recoveryCode);

    await db
        .updateTable('appUser')
        .where('id', '=', userId)
        .set({ recoveryCode: encrypted })
        .execute();

    return recoveryCode;
}

export async function getUserFromEmail(
    email: string,
): Promise<UserResponse | null> {
    const row = await db
        .selectFrom('appUser')
        .where('email', '=', email)
        .select(['id', 'username', 'totpKey', 'emailVerified', 'email'])
        .executeTakeFirst();

    if (row == null) return null;

    return {
        ...row,
        registered2fa: row.totpKey != null,
    };
}

export type UserResponse = Omit<
    User,
    'totpKey' | 'recoveryCode' | 'passwordHash'
> & {
    registered2fa: boolean;
};
