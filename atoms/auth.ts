import { UserResponse } from '#root/lib/server/session';
import { atom } from 'jotai';

export const isLoggedInAtom = atom<boolean>(false);
export const profileAtom = atom<UserResponse | undefined>();
