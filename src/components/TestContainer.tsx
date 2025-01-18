import { useCallback, useEffect } from 'react';
import useMobileTrigger from '../hooks/useMobileTrigger';
import useTyping from '../hooks/useTyping';
import AfkOverlay from './AfkOverlay';
import RetryButton from './RetryButton';
import TestConfigBar from './TestConfigBar';
import TestProgress from './TestProgress';
import Words from './Words';
import useCheckAFK from '../hooks/useCheckAFK';
import { useSetAtom } from 'jotai';
import { closeAfkOverlayAtom } from '../atoms/ui';
import { isMobile } from '@/lib/utils';

export default function TestContainer() {
    const { handleKeys: handleKeyEvent } = useTyping();
    const { inputRef, isInputFocused, triggerTouchKeyboard } =
        useMobileTrigger();

    const closeOverlay = useSetAtom(closeAfkOverlayAtom);

    const handleTouch = () => {
        triggerTouchKeyboard();

        // if (document.activeElement)
        //     (document.activeElement as HTMLElement).blur();
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
            <div className='row-span-1 col-[content] mx-auto'>
                <TestConfigBar />
            </div>
            <div
                className='row-span-1 col-[content] mt-4'
                onClick={handleTouch}
            >
                {isMobile() && (
                    <div>
                        <input
                            ref={inputRef}
                            type='text'
                            style={{
                                opacity: 0,
                                position: 'absolute',
                                top: '-9999px',
                            }}
                        />
                    </div>
                )}
                <div className='mt-4 gap-2 flex items-center'>
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
