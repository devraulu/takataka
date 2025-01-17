import { useCallback, useEffect } from 'react';
import useIsTestFinished from './useIsTestFinished';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
    textAtom,
    typedAtom,
    appendHistoryAtom,
    resetBtnRefAtom,
} from '../atoms/typing';
import { showResultsAtom } from '../atoms/results';
import { isLetter, isPunctuation, isSpace, isNumber } from '@/lib/utils';

const useTyping = () => {
    const isTestFinished = useIsTestFinished();
    const setShowResults = useSetAtom(showResultsAtom);

    useEffect(() => {
        if (isTestFinished) {
            setShowResults(true);
        }
    }, [isTestFinished]);

    const [text, setText] = useAtom(textAtom);
    const [typed, setTyped] = useAtom(typedAtom);
    const appendHistory = useSetAtom(appendHistoryAtom);
    const resetBtnRef = useAtomValue(resetBtnRefAtom);

    const handleKeys = useCallback(
        (e: KeyboardEvent) => {
            const key = e.key;

            if (key === 'Tab') {
                e.preventDefault();
                focusResetBtn();
            }
            if (isLetter(key) || isPunctuation(key) || isNumber(key)) {
                // console.log('typed: ', key, typed.length > 0, typed);
                if (typed.length > 0) {
                    const last = typed.slice(-1)[0] ?? '';
                    setTyped([...typed.slice(0, -1), last + key]);
                } else setTyped([key]);

                appendHistory(key);

                blurResetBtn();
            } else if (key === 'Backspace') {
                // console.log('currently typed after pressing backspaced', typed);
                if (typed.length > 0) {
                    // If there are any words typed, we get the last one
                    const last = typed.slice(-1)[0];

                    // If the last word is empty, we get the prev to last word
                    // and only if it is typed wrong we return it
                    // (which the user will see as moving the cursor back to the previous word)

                    if (last === '') {
                        const typedPrevWord = typed.slice(-2)[0] ?? '';
                        const prevWord =
                            text.split(' ')[typed.length - 2] ?? '';
                        // console.log('prev to last', typedPrevWord, prevWord);

                        if (typedPrevWord !== prevWord)
                            setTyped([...typed.slice(0, -2), typedPrevWord]);
                        return;
                    }

                    // Else we return the last word without the last letter
                    setTyped([...typed.slice(0, -1), last.slice(0, -1)]);
                }
                appendHistory(key);

                blurResetBtn();
            } else if (isSpace(key)) {
                e.preventDefault();
                appendHistory('Space');

                if (typed[typed.length - 1].length > 0)
                    setTyped([...typed, '']);
                blurResetBtn();
            }
        },
        [text, typed],
    );

    const focusResetBtn = () => {
        if (document.activeElement !== resetBtnRef?.current)
            resetBtnRef?.current?.focus();
    };
    const blurResetBtn = () => {
        if (document.activeElement === resetBtnRef?.current)
            resetBtnRef?.current?.blur();
    };

    return {
        text,
        typed,
        handleKeys,
        setText,
    };
};

export default useTyping;
