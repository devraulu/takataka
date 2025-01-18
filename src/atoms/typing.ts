import { atom } from 'jotai';
import Log from '../models/Log';

export const INITIAL_TYPED = [''];
export const typedAtom = atom(INITIAL_TYPED);
export const typedLogAtom = atom<Log[]>([]);
export const lastTestLogsAtom = atom<Log[]>([]);
export const historyAtom = atom<string[]>([]);
export const textAtom = atom('');
export const resetBtnRefAtom =
    atom<React.RefObject<HTMLButtonElement | null>>();

export const wordsContainerRefAtom =
    atom<React.RefObject<HTMLDivElement | null>>();

export const appendTypedLogAtom = atom(null, (_, set, update: Log) =>
    set(typedLogAtom, prev => [...prev, update]),
);

export const appendHistoryAtom = atom(null, (_, set, update: string) =>
    set(historyAtom, prev => [...prev, update]),
);

export const hasTestStartedAtom = atom(get => get(typedLogAtom).length > 0);

export const testLostFocusAtom = atom(false);
