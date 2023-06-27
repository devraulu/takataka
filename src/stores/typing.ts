import React from 'react';
import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import Log from '../models/Log';

export const INITIAL_TYPED = [''];

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
  setResetBtnRef: (ref: React.MutableRefObject<HTMLButtonElement | null>) => void;
  punctuation: boolean;
  togglePunctuation: (val?: boolean) => void;
  numbers: boolean;
  toggleNumbers: (val?: boolean) => void;
  testSize: number;
  setTestSize: (val: number) => void;
  hasTestStarted: () => boolean;
}

const useTypingStore = create<TypingStore>()(
  persist(
    (set, get) => ({
      initialTyped: INITIAL_TYPED,
      typed: INITIAL_TYPED,
      typedLog: [],
      setTyped: (typed: string[]) => set({ typed }),
      setTypedLog: (typedLog: Log[]) => set({ typedLog }),
      appendTypedLog: (log: Log) => set((state) => ({ typedLog: [...state.typedLog, log] })),
      lastTestLogs: [],
      setLastTestLog: (lastTestLogs: Log[]) => set(() => ({ lastTestLogs })),
      history: [],
      setHistory: (history: string[]) => set({ history }),
      appendHistory: (item: string) => set((state) => ({ history: [...state.history, item] })),
      resetBtnRef: React.createRef(),
      setResetBtnRef: (resetBtnRef: React.MutableRefObject<HTMLButtonElement | null>) =>
        set({ resetBtnRef }),

      text: '',
      setText: (text: string) => set({ text }),
      punctuation: false,
      togglePunctuation: (val?: boolean) =>
        set((state) => ({ punctuation: val ?? !state.punctuation })),
      numbers: false,
      toggleNumbers: (val?: boolean) => set((state) => ({ numbers: val ?? !state.numbers })),
      testSize: 25,
      setTestSize: (val: number) => set({ testSize: val }),
      hasTestStarted: () => get().typedLog.length > 0,
    }),
    {
      name: 'typing-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ numbers, punctuation, testSize }) => ({
        numbers,
        punctuation,
        testSize,
      }),
    }
  )
);

export const resetSelector = ({
  setTyped,
  setHistory,
  setLastTestLog,
  setTypedLog,
  resetBtnRef,
  setText,
}: TypingStore) => ({
  setTyped,
  setHistory,
  setLastTestLog,
  setTypedLog,
  resetBtnRef,
  setText,
});

export const typingSelector = ({
  text,
  setText,
  typed,
  setTyped,
  appendHistory,
  resetBtnRef,
}: TypingStore) => ({
  text,
  setText,
  typed,
  setTyped,
  appendHistory,
  resetBtnRef,
});

export const configBarSelector = ({
  punctuation,
  numbers,
  testSize,
  toggleNumbers,
  togglePunctuation,
  setTestSize,
}: TypingStore) => ({
  punctuation,
  numbers,
  testSize,
  toggleNumbers,
  togglePunctuation,
  setTestSize,
});

export const testFinishedSelector = ({ text, typed, typedLog, setLastTestLog }: TypingStore) => ({
  text,
  typed,
  typedLog,
  setLastTestLog,
});

export default useTypingStore;
