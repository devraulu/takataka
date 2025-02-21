import { atom } from 'jotai';
import { showResultsAtom } from './results';
import { checkWord } from '#root/lib/utils/words';
import { WordStat } from '#root/types/word-stat';
import Log from '#root/types/Log';

export const INITIAL_TYPED = [''];
export const typedAtom = atom(INITIAL_TYPED);

export const currentlyTypingIndexAtom = atom(0);

export const setTypedAtom = atom(null, (get, set, typed: string[]) => {
    const text = get(textAtom);
    const splitText = text.split(' ');

    const checkedWords: Array<[number, WordStat]> = [];

    if (typed.length > 1) {
        const index = typed.length - 2;
        const lastWord = splitText[index];
        const typedWord = typed[index];
        const checkedLastWord = checkWord(lastWord, typedWord, index, false);
        checkedWords.push([index, checkedLastWord]);
    }

    const currentIndex = typed.length - 1;
    const checkedCurrentWord = checkWord(
        splitText[currentIndex],
        typed[currentIndex],
        currentIndex,
    );

    checkedWords.push([currentIndex, checkedCurrentWord]);

    let currentlyTypingIndex = 0;
    for (const [index, value] of checkedCurrentWord.letters.entries()) {
        if (!value.isTyped) break;
        currentlyTypingIndex = index;
    }

    set(currentlyTypingIndexAtom, currentlyTypingIndex);

    set(checkedWordsAtom, prev => {
        const newCheckedWords = [...prev];

        for (const [index, word] of checkedWords) {
            newCheckedWords[index] = word;
        }
        return newCheckedWords;
        // return [
        //     ...prev.slice(0, typed.length - checkedWords.length),
        //     ...checkedWords,
        //     ...prev.slice(typed.length),
        // ];
    });

    set(typedAtom, typed);
});

export const typedLogAtom = atom<Log[]>([]);
export const lastTestLogsAtom = atom<Log[]>([]);
export const historyAtom = atom<string[]>([]);
export const textAtom = atom('');
export const resetBtnRefAtom = atom<HTMLButtonElement | null>();

export const checkedWordsAtom = atom<WordStat[]>([]);
export const appendCheckedWordsAtom = atom(null, (_, set, update: WordStat) =>
    set(checkedWordsAtom, prev => [...prev, update]),
);

export const testInputRefAtom = atom<HTMLInputElement | null>();

export const appendTypedLogAtom = atom(null, (_, set, update: Log) =>
    set(typedLogAtom, prev => [...prev, update]),
);

export const appendHistoryAtom = atom(null, (_, set, update: string) =>
    set(historyAtom, prev => [...prev, update]),
);

export const hasTestStartedAtom = atom(get => get(typedLogAtom).length > 0);

export const testLostFocusAtom = atom(false);

export const resetTestAtom = atom(null, (get, set) => {
    set(setTypedAtom, INITIAL_TYPED);
    set(historyAtom, []);
    set(showResultsAtom, false);
    set(lastTestLogsAtom, []);
    set(typedLogAtom, []);
    set(
        checkedWordsAtom,
        get(textAtom)
            .split(' ')
            .map((word, i) => {
                const newWord = checkWord(word, '', i);
                return newWord;
            }),
    );
});
