import React, { useEffect } from 'react';
import useMobileTrigger from '#root/hooks/useMobileTrigger';
import AfkOverlay from './AfkOverlay';
import RetryButton from './RetryButton';
import TestConfigBar from './TestConfigBar';
import TestProgress from './TestProgress';
import Words from './Words';
import useCheckAFK from '#root/hooks/useCheckAFK';
import { closeAfkOverlayAtom } from '#root/atoms/ui';

import { useAtomValue, useSetAtom } from 'jotai';
import {
    appendHistoryAtom,
    setTypedAtom,
    testLostFocusAtom,
    textAtom,
    typedAtom,
    testInputRefAtom,
} from '#root/atoms/typing';
import { showResultsAtom } from '#root/atoms/results';
import {
    focusInputAndScrollIntoView,
    isLetter,
    isNumber,
    isPunctuation,
    isSpace,
} from '#root/lib/utils';
import { toast } from 'sonner';
import useIsTestFinished from '#root/hooks/useIsTestFinished';

export default function TestContainer() {
    const { inputRef, triggerTouchKeyboard } = useMobileTrigger();

    const setContainerRef = useSetAtom(testInputRefAtom);

    const closeOverlay = useSetAtom(closeAfkOverlayAtom);

    const handleTouch = () => {
        triggerTouchKeyboard();
        closeOverlay();
    };

    useCheckAFK();

    const isTestFinished = useIsTestFinished();
    const setShowResults = useSetAtom(showResultsAtom);

    useEffect(() => {
        if (isTestFinished) {
            setShowResults(true);
        }
    }, [isTestFinished]);

    const text = useAtomValue(textAtom);
    const typed = useAtomValue(typedAtom);
    const setTyped = useSetAtom(setTypedAtom);
    const appendHistory = useSetAtom(appendHistoryAtom);
    const setTestLostFocus = useSetAtom(testLostFocusAtom);
    const testInputRef = useAtomValue(testInputRefAtom);

    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            const key = e.key;

            if (key === 'Tab') {
                setTestLostFocus(true);
                return;
            }

            if (e.ctrlKey || e.metaKey || e.altKey) {
                // continue as usual and let the user use the ctrl (cmd) key to navigate etc.
                return;
            }

            triggerTouchKeyboard();

            if (isLetter(key) || isPunctuation(key) || isNumber(key)) {
                if (typed.length > 0) {
                    const last = typed.slice(-1)[0] ?? '';
                    setTyped([...typed.slice(0, -1), last + key]);
                } else setTyped([key]);

                appendHistory(key);

                if (testInputRef && document.activeElement !== testInputRef) {
                    focusInputAndScrollIntoView(testInputRef);
                    setTestLostFocus(false);

                    toast.dismiss();
                }

                // blurResetBtn();
            } else if (key === 'Backspace') {
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

                        if (typedPrevWord !== prevWord) {
                            setTyped([...typed.slice(0, -2), typedPrevWord]);
                        }
                        return;
                    }

                    // Else we return the last word without the last letter
                    setTyped([...typed.slice(0, -1), last.slice(0, -1)]);
                }
                appendHistory(key);
            } else if (isSpace(key)) {
                e.preventDefault();
                appendHistory('Space');

                if (typed[typed.length - 1].length > 0) {
                    setTyped([...typed, '']);
                }
            }
        };

        window.addEventListener('keydown', handleKeys);

        return () => window.removeEventListener('keydown', handleKeys);
    }, [typed, text]);

    return (
        <>
            <div className='row-span-1 col-[full-width] mx-auto'>
                <TestConfigBar />
            </div>
            <div className='row-span-1 col-[content]' onClick={handleTouch}>
                <div>
                    <input
                        ref={ref => {
                            setContainerRef(ref);
                            inputRef.current = ref;
                        }}
                        type='text'
                        style={{
                            opacity: 0,
                            position: 'absolute',
                            width: '1ch',
                            fontSize: '1rem',
                            height: '1rem',
                            padding: 0,
                            margin: '0 auto',
                            border: 'none',
                            outline: 'none',
                            display: 'block',
                            resize: 'none',
                            zIndex: '-1',
                            cursor: 'default',
                            pointerEvents: 'none',
                            borderRadius: 0,
                        }}
                        autoFocus
                        tabIndex={1}
                        aria-label='Type here'
                        autoComplete='off'
                        autoCorrect='off'
                        autoSave='off'
                        spellCheck={false}
                        list='autocompleteOff'
                        data-enable-grammarly='false'
                    />
                </div>
                <div className='gap-2 flex items-center'>
                    <TestProgress />
                    <RetryButton />
                </div>
                <div className='relative p-4 mt-3'>
                    <AfkOverlay handleTouch={handleTouch} />
                    <Words />
                </div>
            </div>
        </>
    );
}
