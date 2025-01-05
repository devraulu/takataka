import { useEffect } from 'react';
import useMobileTrigger from '../hooks/useMobileTrigger';
import { isMobile } from '../utils';
import useTyping from '../hooks/useTyping';
import { Box, Group } from '@mantine/core';
import AfkOverlay from './AfkOverlay';
import RetryButton from './RetryButton';
import TestConfigBar from './TestConfigBar';
import TestProgress from './TestProgress';
import Words from './Words';
import useCheckAFK from '../hooks/useCheckAFK';

export default function TestContainer() {
    const { handleKeys: handleKeyEvent } = useTyping();
    const { inputRef, isInputFocused, triggerTouchKeyboard } =
        useMobileTrigger();

    const handleTouch = () => {
        triggerTouchKeyboard();
        close();
    };

    const handleKeys = (event: KeyboardEvent) => {
        if (isMobile() && !isInputFocused()) {
            triggerTouchKeyboard();
        }

        handleKeyEvent(event);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeys);

        return () => {
            window.removeEventListener('keydown', handleKeys);
        };
    }, [handleKeys]);

    useCheckAFK();

    return (
        <>
            <TestConfigBar />
            <Box mt='md' onClick={handleTouch}>
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
                <Group mt='md' align='center'>
                    <TestProgress />
                    <RetryButton />
                </Group>
                <Box sx={{ position: 'relative' }} p='md' mt='sm'>
                    <AfkOverlay handleTouch={handleTouch} />
                    <Words />
                </Box>
            </Box>
        </>
    );
}
