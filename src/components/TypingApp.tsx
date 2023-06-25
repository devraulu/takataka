import React, { useEffect, useRef } from 'react';
import Words from './Words';
import useTyping from '../hooks/useTyping';
import { Box, Group, Overlay, Text } from '@mantine/core';
import useShowResultsStore from '../stores/results';
import Results from './Results';
import useTypedLog from '../hooks/useTypedLog';
import TestConfigBar from './TestConfigBar';
import useTypingStore from '../stores/typing';
import useGenerateInitialTest from '../hooks/useGenerateInitialTest';
import TestProgress from './TestProgress';
import useResetTest from '../hooks/useResetTest';
import RetryButton from './RetryButton';
import useCheckAFK from '../hooks/useCheckAFK';
import usePropmtOverlay from '../hooks/usePromptOverlay';

interface TypingAppProps {}

const TypingApp: React.FunctionComponent<TypingAppProps> = () => {
    const { handleKeys: handleKeyEvent } = useTyping();
    const hasTestStarted = useTypingStore(state => state.hasTestStarted());
    const showResults = useShowResultsStore(state => state.showResults);
    const inputRef = useRef<HTMLInputElement>(null);

    useTypedLog();

    const handleKeys = (event: KeyboardEvent) => {
        if (isMobile() && !isInputFocused()) {
            triggerTouchKeyboard();
        }
        // Handle other key events as needed
        handleKeyEvent(event);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeys);

        return () => {
            window.removeEventListener('keydown', handleKeys);
        };
    }, [handleKeys]);

    useGenerateInitialTest();

    useCheckAFK();

    const { show: showOverlay, close } = usePropmtOverlay();

    const isMobile = () => {
        // Logic to check if the device is a mobile device
        // You can use user-agent detection or any other method
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
    };

    const isInputFocused = () => {
        return document.activeElement === inputRef.current;
    };

    const triggerTouchKeyboard = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleTouch = () => {
        triggerTouchKeyboard();
        close();
    };

    return (
        <Box>
            {showResults ? (
                <Results />
            ) : (
                <Box>
                    <Box w='80%' mx='auto'>
                        <Box
                            sx={{
                                visibility: hasTestStarted
                                    ? 'hidden'
                                    : 'initial',
                            }}
                        >
                            <TestConfigBar />
                        </Box>
                        <Box
                            mt='md'
                            sx={{ position: 'relative' }}
                            onClick={handleTouch}
                        >
                            {showOverlay && (
                                <Overlay blur={15} center onClick={handleTouch}>
                                    <Text color='primary'>
                                        Click here or start typing to start test
                                    </Text>
                                </Overlay>
                            )}
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
                            <Group
                                mt='md'
                                align='center'
                                sx={{
                                    visibility: !hasTestStarted
                                        ? 'hidden'
                                        : 'initial',
                                }}
                            >
                                <TestProgress />
                                <RetryButton />
                            </Group>
                            <Box>
                                <Words />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default TypingApp;
