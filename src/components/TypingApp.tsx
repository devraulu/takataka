import React, { useEffect, useRef } from 'react';
import Words from './Words';
import useTyping from '../hooks/useTyping';
import { ActionIcon, Box, Group, Text, rem } from '@mantine/core';
import useShowResultsStore from '../stores/results';
import Results from './Results';
import useTypedLog from '../hooks/useTypedLog';
import TestConfigBar from './TestConfigBar';
import useTypingStore from '../stores/typing';
import useGenerateInitialTest from '../hooks/useGenerateInitialTest';
import { ArrowBackUp } from 'tabler-icons-react';
import TestProgress from './TestProgress';
import useResetTest from '../hooks/useResetTest';
import RetryButton from './RetryButton';

interface TypingAppProps {}

const TypingApp: React.FunctionComponent<TypingAppProps> = () => {
    const { handleKeys } = useTyping();
    const [hasTestStarted, setResetBtnRef] = useTypingStore(state => [
        state.hasTestStarted(),
        state.setResetBtnRef,
    ]);
    const { showResults } = useShowResultsStore();

    useTypedLog();

    useEffect(() => {
        window.addEventListener('keydown', handleKeys);

        return () => {
            window.removeEventListener('keydown', handleKeys);
        };
    }, [handleKeys]);

    useGenerateInitialTest();

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
                        <Box mt='md'>
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

                            <Words />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default TypingApp;
