import React, { useCallback, useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import useShowResultsStore from '../stores/useShowResultsStore';
import useTimerStore from '../stores/useTimerStore';
import useTypingStore from '../stores/useTypingStore';
import { isLetter, isPunctuation, isSpace } from '../utils';

const useTyping = () => {
    const {
        count: storeCount,
        initialCount,
        isPlaying,
        setPlaying,
        setCount: setStoreCount,
        decreaseCount,
        resetCount,
    } = useTimerStore();

    const { toggleResults, setResults } = useShowResultsStore();

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

    const [count, setCount] = useState(initialCount);

    const handleKeys = useCallback(
        (e: KeyboardEvent) => {
            const key = e.key;
            // console.log('key', key);
            if (key === 'Tab') {
                e.preventDefault();
                focusResetBtn();
            }
            if (isLetter(key) || isPunctuation(key)) {
                if (typed == initialTyped) {
                    setPlaying(true);
                    console.log('playing true');
                }
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
                console.log(
                    'Spaced pressed',
                    history,
                    history.slice(-2)[0],
                    history.slice(-1)[0]
                );
                setHistory([...history, 'Space']);

                const prevPrevChar = history.slice(-2)[0];
                const prevChar = history.slice(-1)[0];

                if (prevChar !== 'Space' && prevPrevChar !== 'Space')
                    setTyped([...typed, '']);
                blurResetBtn();
            }
        },
        [text, typed, history]
    );

    useEffect(() => {
        const lastWord = typed[typed.length - 1];
        const lastLetter = lastWord[lastWord.length - 1];
        const typedStr = typed.reduce((acc, curr) => {
            console.log('acc, curr', curr);
            return acc + ' ' + curr;
        });
        console.log(
            typedStr,
            typedStr.length,
            text.length,
            // lastWord,
            lastLetter,
            text[text.length - 1]
        );
        if (
            typedStr.length === text.length &&
            typedStr[typedStr.length - 1] === text[text.length - 1]
        ) {
            console.log('test finished');
            setPlaying(false);
            toggleResults(true);
        }
    }, [typed]);

    const focusResetBtn = () => {
        if (document.activeElement !== resetBtnRef.current)
            resetBtnRef.current?.focus();
    };
    const blurResetBtn = () => {
        if (document.activeElement === resetBtnRef.current)
            resetBtnRef.current?.blur();
    };

    const reset = () => {
        // console.log('reset pressed');
        setTyped(initialTyped);
        setHistory([]);
        resetCount();
        setPlaying(false);
        setResults(false);
        resetBtnRef.current?.blur();
    };

    const setResetBtnAndLog = (
        ref: React.MutableRefObject<HTMLButtonElement | null>
    ) => {
        // console.log('Setting new ref', ref);
        setResetBtnRef(ref);
    };

    return {
        text,
        typed,
        handleKeys,
        count,
        isPlaying,
        reset,
        resetBtnRef,
        setResetBtnRef: setResetBtnAndLog,
    };
};

export default useTyping;
