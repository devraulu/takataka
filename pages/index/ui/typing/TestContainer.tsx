import React, { useCallback, useEffect } from 'react';
import useMobileTrigger from '#root/hooks/useMobileTrigger';
import useTyping from './hooks/useTyping';
import AfkOverlay from './AfkOverlay';
import RetryButton from './RetryButton';
import TestConfigBar from './TestConfigBar';
import TestProgress from './TestProgress';
import Words from './Words';
import useCheckAFK from '#root/hooks/useCheckAFK';
import { useSetAtom } from 'jotai';
import { closeAfkOverlayAtom } from '#root/atoms/ui';
import { isMobile } from '#root/utils';
import { testInputRefAtom } from '#root/atoms/typing';

export default function TestContainer() {
    const { handleKeys: handleKeyEvent } = useTyping();
    const { inputRef, isInputFocused, triggerTouchKeyboard } =
        useMobileTrigger();

    const setContainerRef = useSetAtom(testInputRefAtom);

    useEffect(() => {
        if (inputRef.current === null) return;
        setContainerRef(inputRef);
    }, [inputRef, setContainerRef]);

    const closeOverlay = useSetAtom(closeAfkOverlayAtom);

    const handleTouch = () => {
        triggerTouchKeyboard();
        closeOverlay();
    };

    const handleKeys = useCallback(
        (event: KeyboardEvent) => {
            if (isMobile() && !isInputFocused()) {
                triggerTouchKeyboard();
            }

            handleKeyEvent(event);
        },
        [handleKeyEvent, isInputFocused, triggerTouchKeyboard],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeys);

        return () => {
            window.removeEventListener('keydown', handleKeys);
        };
    }, [handleKeys]);

    useCheckAFK();

    return (
        <>
            <div className='row-span-1 col-[full-width] mx-auto'>
                <TestConfigBar />
            </div>
            <div className='row-span-1 col-[content]' onClick={handleTouch}>
                <div>
                    <input
                        ref={inputRef}
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
