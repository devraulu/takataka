import { db } from '#root/database/dialect';
import { BasicRateLimit } from './rate-limit';
import { decryptToString, encryptString } from './encryption';
import { constantTimeEqualString, generateRandomRecoveryCode } from './utils';

export const userTOTPVerificationRateLimit = new BasicRateLimit<number>(
    5,
    60 * 30,
);
export const userRecoveryCodeVerificationRateLimit = new BasicRateLimit<number>(
    3,
    60 * 60,
);

export async function resetUser2FAWithRecoveryCode(
    userId: number,
    providedRecoveryCode: string,
): Promise<boolean> {
    return await db.transaction().execute(async tx => {
        const row = await tx
            .selectFrom('appUser')
            .select('recoveryCode')
            .forUpdate()
            .executeTakeFirstOrThrow();

        if (row?.recoveryCode == null) {
            throw new Error('Recovery code not found');
        }
        const encryptedRecoveryCode = row.recoveryCode;
        const recoveryCode = await decryptToString(encryptedRecoveryCode);
        if (!constantTimeEqualString(recoveryCode, providedRecoveryCode)) {
            throw new Error('Invalid recovery code');
        }
        const newRecoveryCode = generateRandomRecoveryCode();
        const encryptedNewRecoveryCode = await encryptString(newRecoveryCode);

        await tx
            .updateTable('userSession')
            .set({ twoFactorVerified: false })
            .where('userId', '=', userId)
            .executeTakeFirstOrThrow();

        const result = await tx
            .updateTable('appUser')
            .set({ recoveryCode: encryptedNewRecoveryCode })
            .where('id', '=', userId)
            .where('recoveryCode', '=', encryptedRecoveryCode)
            .executeTakeFirstOrThrow();

        return result.numUpdatedRows > 0;
    });
}
