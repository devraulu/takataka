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
    text: SAMPLE_TEXT,
    setText: (text: string) => set(state => ({ text })),
    resetBtnRef: React.createRef(),
    setResetBtnRef: (
        resetBtnRef: React.MutableRefObject<HTMLButtonElement | null>
    ) => set(state => ({ resetBtnRef })),
}));

export default useTypingStore;
