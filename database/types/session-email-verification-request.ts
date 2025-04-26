import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely';

export default interface SessionEmailVerificationRequestTable {
    id: Generated<number>;
    token: ColumnType<string, string, never>;
    expiresAt: ColumnType<Date, string, string>;
    email: string;
    code: string;
}

export type SessionEmailVerificationRequest =
    Selectable<SessionEmailVerificationRequestTable>;
export type NewSessionEmailVerificationRequest =
    Insertable<SessionEmailVerificationRequestTable>;
export type SessionEmailVerificationRequestUpdate =
    Updateable<SessionEmailVerificationRequestTable>;
