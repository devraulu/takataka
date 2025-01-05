import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Log from '../models/Log';
import { generateTestWords } from '../utils/random-words';

export const INITIAL_TYPED = [''];
export const typedAtom = atom(INITIAL_TYPED);
export const typedLogAtom = atom<Log[]>([]);
export const lastTestLogsAtom = atom<Log[]>([]);
export const historyAtom = atom<string[]>([]);
export const textAtom = atom('');
export const resetBtnRefAtom =
    atom<React.RefObject<HTMLButtonElement | null>>();

export const appendTypedLogAtom = atom(null, (_, set, update: Log) =>
    set(typedLogAtom, prev => [...prev, update]),
);

export const appendHistoryAtom = atom(null, (_, set, update: string) =>
    set(historyAtom, prev => [...prev, update]),
);

export const hasTestStartedAtom = atom(get => get(typedLogAtom).length > 0);
