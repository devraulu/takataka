import React, { useCallback, useEffect } from 'react';
import useShowResultsStore from '../stores/useShowResultsStore';
import useTypingStore from '../stores/useTypingStore';
import { isLetter, isPunctuation, isSpace } from '../utils';
import useIsTestFinished from './useIsTestFinished';

const useTyping = () => {
    const { toggleResults, setResults } = useShowResultsStore();

    const isTestFinished = useIsTestFinished();

    useEffect(() => {
        if (isTestFinished) {
            toggleResults(true);
        }
    }, [isTestFinished]);

    const {
        text,
        initialTyped,
        typed,
        history,
        setTyped,
        setHistory,
        appendHistory,
        resetBtnRef,
        setResetBtnRef,
    } = useTypingStore();

    const handleKeys = useCallback(
        (e: KeyboardEvent) => {
            const key = e.key;
            // console.log('key', key);

            if (key === 'Tab') {
                e.preventDefault();
                focusResetBtn();
            }
            if (isLetter(key) || isPunctuation(key)) {
                console.log('typed: ', key, typed.length > 0, typed);
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
                    let last = typed.slice(-1)[0];

                    // If the last word is empty, we get the prev to last word
                    // and only if it is wrongly typed we return it
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
                //  else setTyped(typed);

                setHistory([...history, key]);

                blurResetBtn();
            } else if (isSpace(key)) {
                e.preventDefault();
                // console.log('history', history);
                setHistory([...history, 'Space']);

                // const prevPrevChar = history.slice(-2)[0];
                // const prevChar = history.slice(-1)[0];
                if (typed[typed.length - 1].length > 0)
                    // if (prevChar !== 'Space' && prevPrevChar !== 'Space')
                    setTyped([...typed, '']);
                blurResetBtn();
            }
        },
        [text, typed, history]
    );

    const focusResetBtn = () => {
        if (document.activeElement !== resetBtnRef.current)
            resetBtnRef.current?.focus();
    };
    const blurResetBtn = () => {
        if (document.activeElement === resetBtnRef.current)
            resetBtnRef.current?.blur();
    };

    const newTest = () => {
        setTyped(initialTyped);
        setHistory([]);
        setResults(false);
    };
    const reset = () => {
        setTyped(initialTyped);
        setHistory([]);
        setResults(false);
        resetBtnRef.current?.blur();
    };

    const setResetBtnAndLog = (
        ref: React.MutableRefObject<HTMLButtonElement | null>
    ) => {
        setResetBtnRef(ref);
    };

    return {
        text,
        typed,
        handleKeys,
        reset,
        newTest,
        resetBtnRef,
        setResetBtnRef: setResetBtnAndLog,
    };
};

export default useTyping;
