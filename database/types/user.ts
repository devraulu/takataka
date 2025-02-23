import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export default interface UserTable {
    id: Generated<number>;
    username: string;
    email: string;
    emailVerified: boolean | null;
    passwordHash: string;
    totpKey: Uint8Array | null;
    recoveryCode: Uint8Array | null;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
