import React, { useEffect } from 'react';
import Words from './Words';
import useTyping from '../hooks/useTyping';
import {
    Box,
    Group,
    Stack,
    em,
    getBreakpointValue,
    useMantineTheme,
} from '@mantine/core';
import Results from './Results';
import useTypedLog from '../hooks/useTypedLog';
import TestConfigBar from './TestConfigBar';
import TestProgress from './TestProgress';
import RetryButton from './RetryButton';
import useCheckAFK from '../hooks/useCheckAFK';
import useMobileTrigger from '../hooks/useMobileTrigger';
import { isMobile } from '../utils';
import AfkOverlay from './AfkOverlay';
import { useAtomValue } from 'jotai';
import { showResultsAtom } from '../atoms/results';

interface TypingAppProps {}

const TypingApp: React.FunctionComponent<TypingAppProps> = () => {
    const { handleKeys: handleKeyEvent } = useTyping();

    console.log('typing app rendered');

    const theme = useMantineTheme();

    const showResults = useAtomValue(showResultsAtom);

    const { inputRef, isInputFocused, triggerTouchKeyboard } =
        useMobileTrigger();

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

    const handleTouch = () => {
        triggerTouchKeyboard();
        close();
    };

    return (
        <Stack
            justify='center'
            maw={em(getBreakpointValue(theme.breakpoints.xl))}
            mx='auto'
            // sx={{ flex: 1 }}
            w='95%'
        >
            {showResults ? (
                <Results />
            ) : (
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
            )}
        </Stack>
    );
};

export default TypingApp;
