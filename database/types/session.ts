import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely';

export default interface SessionTable {
    token: ColumnType<string, string, never>;
    id: Generated<number>;
    userId: number;
    expiresAt: ColumnType<Date, string, Date>;
    twoFactorVerified: boolean;
}

export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;
