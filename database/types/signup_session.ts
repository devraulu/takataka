import {
    Selectable,
    Insertable,
    Updateable,
    ColumnType,
    Generated,
} from 'kysely';

export default interface SignupSessionTable {
    id: Generated<number>;
    token: ColumnType<string, string, never>;
    expiresAt: ColumnType<Date, string, Date>;
    username: string;
    email: string;
    passwordHash: string;
    emailVerificationCode: string;
}

export type SignupSession = Selectable<SignupSessionTable>;
export type NewSignupSession = Insertable<SignupSessionTable>;
export type SignupSessionUpdate = Updateable<SignupSessionTable>;
