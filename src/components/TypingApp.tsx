import React, { useEffect, useRef } from 'react';
import Words from './Words';
import useTyping from '../hooks/useTyping';
import { ActionIcon, Box, Group, Text } from '@mantine/core';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import useShowResultsStore from '../stores/useShowResultsStore';
import useTimerStore from '../stores/useTimerStore';
import { useInterval } from 'usehooks-ts';
import Results from './Results';
import useTypedLog from '../hooks/useTypedLog';

interface TypingAppProps {}

const TypingApp: React.FunctionComponent<TypingAppProps> = () => {
    const { reset, setResetBtnRef, handleKeys, typed, text } = useTyping();

    const resetBtn = useRef<HTMLButtonElement | null>(null);
    const { showResults, toggleResults } = useShowResultsStore();

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

    return (
        <Box>
            {showResults ? (
                <Results />
            ) : (
                <Box>
                    <Text size='xl'>
                        {typed.length - 1}/{text.split(' ').length}
                    </Text>

                    <ActionIcon
                        ref={resetBtn}
                        className='restart'
                        onClick={reset}
                        size={'sm'}
                    >
                        <ArrowUturnLeftIcon />
                    </ActionIcon>
                    <Words />
                </Box>
            )}
        </Box>
    );
};

export default TypingApp;
