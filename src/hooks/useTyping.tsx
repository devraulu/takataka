import React, { useCallback, useEffect } from 'react';
import useShowResultsStore from '../stores/results';
import useTypingStore from '../stores/typing';
import { isLetter, isNumber, isPunctuation, isSpace } from '../utils';
import useIsTestFinished from './useIsTestFinished';
import useGenerateTest from './useGenerateTest';

const useTyping = () => {
    const { toggleResults, setResults } = useShowResultsStore();

    const isTestFinished = useIsTestFinished();
    const generate = useGenerateTest();
    useEffect(() => {
        if (isTestFinished) {
            toggleResults(true);
        }
    }, [isTestFinished]);

    const {
        text,
        setText,
        initialTyped,
        typed,
        history,
        setTyped,
        setHistory,
        appendHistory,
        resetBtnRef,
        setResetBtnRef,
        setLastTestLog,
        setTypedLog,
    } = useTypingStore();

    const handleKeys = useCallback(
        (e: KeyboardEvent) => {
            const key = e.key;
            // console.log('key', key);

            if (key === 'Tab') {
                e.preventDefault();
                focusResetBtn();
            }
            if (isLetter(key) || isPunctuation(key) || isNumber(key)) {
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

                setHistory([...history, key]);

                blurResetBtn();
            } else if (isSpace(key)) {
                e.preventDefault();
                setHistory([...history, 'Space']);

                if (typed[typed.length - 1].length > 0)
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

    const reset = () => {
        setTyped(initialTyped);
        setHistory([]);
        setResults(false);
        setLastTestLog([]);
        setTypedLog([]);
        resetBtnRef.current?.blur();
    };

    const newTest = () => {
        reset();
        setText(generate());
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
        setText,
    };
};

export default useTyping;
