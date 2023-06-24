import React, { useEffect, useRef } from 'react';
import Words from './Words';
import useTyping from '../hooks/useTyping';
import {
    ActionIcon,
    Box,
    Group,
    Text,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import useShowResultsStore from '../stores/results';
import Results from './Results';
import useTypedLog from '../hooks/useTypedLog';
import TestConfigBar from './TestConfigBar';
import useTypingStore from '../stores/typing';
import useGenerateInitialTest from '../hooks/useGenerateInitialTest';

interface TypingAppProps {}

const TypingApp: React.FunctionComponent<TypingAppProps> = () => {
    const { newTest, setResetBtnRef, handleKeys, typed, text } = useTyping();
    const hasTestStarted = useTypingStore(state => state.hasTestStarted());
    const resetBtn = useRef<HTMLButtonElement | null>(null);
    const { showResults } = useShowResultsStore();

    useEffect(() => {
        setResetBtnRef(resetBtn);
    }, [resetBtn]);

    useTypedLog();

    useEffect(() => {
        window.addEventListener('keydown', handleKeys);

        return () => {
            window.removeEventListener('keydown', handleKeys);
        };
    }, [handleKeys]);

    useGenerateInitialTest();

    const theme = useMantineTheme();

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
                                <Text
                                    size='lg'
                                    color={'primary.4'}
                                    // fw={'bold'}
                                    fz={rem(24)}
                                >
                                    {typed.length - 1}/{text.split(' ').length}
                                </Text>

                                <ActionIcon
                                    ref={resetBtn}
                                    className='restart'
                                    onClick={newTest}
                                    size={'sm'}
                                >
                                    <ArrowUturnLeftIcon width={20} />
                                </ActionIcon>
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
