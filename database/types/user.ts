import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export default interface UserTable {
    id: Generated<number>;
    username: string;
    email: string;
    googleId: string | null;
    picture: string | null;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
