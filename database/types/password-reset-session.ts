import { ColumnType, Generated, Insertable, Selectable } from 'kysely';

export default interface PasswordResetSessionTable {
    id: Generated<number>;
    token: ColumnType<string, string, never>;
    userId: ColumnType<number, number, never>;
    email: ColumnType<string, string, never>;
    emailVerified: boolean;
    emailVerificationCodeHash: ColumnType<string, string, never>;
    expiresAt: ColumnType<Date, string, never>;
    twoFactorVerified: boolean;
}

export type PasswordResetSession = Selectable<PasswordResetSessionTable>;
export type NewPasswordResetSession = Insertable<PasswordResetSessionTable>;
export type PasswordResetSessionUpdate = never;
