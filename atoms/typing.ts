import { atom } from "jotai";
import Log from "#root/models/Log";
import { showResultsAtom } from "./results";
import { Word } from "#root/models/Word";
import { checkWord } from "#root/lib/utils/words";

export const INITIAL_TYPED = [""];
export const typedAtom = atom(INITIAL_TYPED);

export const currentlyTypingIndexAtom = atom(0);

export const setTypedAtom = atom(null, (get, set, typed: string[]) => {
  const text = get(textAtom);
  const splitText = text.split(" ");

  const checkedWords: Word[] = [];
  if (typed.length > 1) {
    const lastWord = splitText[typed.length - 2];
    const typedWord = typed[typed.length - 2];
    const checkedLastWord = checkWord(lastWord, typedWord, typed.length - 2, false);
    checkedWords.push(checkedLastWord);
  }

  const checkedCurrentWord = checkWord(splitText[typed.length - 1], typed[typed.length - 1], typed.length - 1);

  checkedWords.push(checkedCurrentWord);

  let currentlyTypingIndex = 0;
  for (const [index, value] of checkedCurrentWord.letters.entries()) {
    if (!value.isTyped) break;
    currentlyTypingIndex = index;
  }

  set(currentlyTypingIndexAtom, currentlyTypingIndex);

  set(checkedWordsAtom, (prev) => {
    return [...prev.slice(0, typed.length - checkedWords.length), ...checkedWords, ...prev.slice(typed.length)];
  });

  set(typedAtom, typed);
});

export const typedLogAtom = atom<Log[]>([]);
export const lastTestLogsAtom = atom<Log[]>([]);
export const historyAtom = atom<string[]>([]);
export const textAtom = atom("");
export const resetBtnRefAtom = atom<React.RefObject<HTMLButtonElement | null>>();

export const checkedWordsAtom = atom<Word[]>([]);
export const appendCheckedWordsAtom = atom(null, (_, set, update: Word) =>
  set(checkedWordsAtom, (prev) => [...prev, update]),
);

export const testInputRefAtom = atom<React.RefObject<HTMLInputElement | null>>();

export const appendTypedLogAtom = atom(null, (_, set, update: Log) => set(typedLogAtom, (prev) => [...prev, update]));

export const appendHistoryAtom = atom(null, (_, set, update: string) => set(historyAtom, (prev) => [...prev, update]));

export const hasTestStartedAtom = atom((get) => get(typedLogAtom).length > 0);

export const testLostFocusAtom = atom(false);

export const resetTestAtom = atom(null, (get, set) => {
  set(typedAtom, INITIAL_TYPED);
  set(historyAtom, []);
  set(showResultsAtom, false);
  set(lastTestLogsAtom, []);
  set(typedLogAtom, []);
  set(
    checkedWordsAtom,
    get(textAtom)
      .split(" ")
      .map((word, i) => {
        const newWord = checkWord(word, "", i);
        return newWord;
      }),
  );
});
