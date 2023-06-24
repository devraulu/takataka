import React from 'react';
import create from 'zustand';
import Log from '../models/Log';

const INITIAL_TYPED = [''];

export const SAMPLE_TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

export interface TypingStore {
    initialTyped: string[];
    typed: string[];
    typedLog: Log[];
    setTyped: (typed: string[]) => void;
    setTypedLog: (typed: Log[]) => void;
    lastTestLogs: Log[];
    setLastTestLog: (logs: Log[]) => void;
    appendTypedLog: (log: Log) => void;
    history: string[];
    setHistory: (history: string[]) => void;
    appendHistory: (item: string) => void;
    text: string;
    setText: (text: string) => void;
    resetBtnRef: React.MutableRefObject<HTMLButtonElement | null>;
    setResetBtnRef: (
        ref: React.MutableRefObject<HTMLButtonElement | null>
    ) => void;
    punctuation: boolean;
    togglePunctuation: (val?: boolean) => void;
    numbers: boolean;
    toggleNumbers: (val?: boolean) => void;
    testSize: number;
    setTestSize: (val: number) => void;
    hasTestStarted: () => boolean;
}

const useTypingStore = create<TypingStore>((set, get) => ({
    initialTyped: INITIAL_TYPED,
    typed: INITIAL_TYPED,
    typedLog: [],
    setTyped: (typed: string[]) => set(state => ({ typed })),
    setTypedLog: (typedLog: Log[]) => set(state => ({ typedLog })),
    appendTypedLog: (log: Log) =>
        set(state => ({ typedLog: [...state.typedLog, log] })),
    lastTestLogs: [],
    setLastTestLog: (lastTestLogs: Log[]) => set(state => ({ lastTestLogs })),
    history: [],
    setHistory: (history: string[]) => set(state => ({ history })),
    appendHistory: (item: string) =>
        set(state => ({ history: [...state.history, item] })),
    resetBtnRef: React.createRef(),
    setResetBtnRef: (
        resetBtnRef: React.MutableRefObject<HTMLButtonElement | null>
    ) => set(state => ({ resetBtnRef })),

    text: '',
    setText: (text: string) => set(state => ({ text })),
    punctuation: false,
    togglePunctuation: (val?: boolean) =>
        set(state => ({ punctuation: val ?? !state.punctuation })),
    numbers: false,
    toggleNumbers: (val?: boolean) =>
        set(state => ({ numbers: val ?? !state.numbers })),
    testSize: 25,
    setTestSize: (val: number) => set(state => ({ testSize: val })),
    hasTestStarted: () => get().typedLog.length > 0,
}));

export default useTypingStore;
