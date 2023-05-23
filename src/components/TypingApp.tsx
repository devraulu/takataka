import React, { useEffect, useRef } from 'react';
import Words from './Words';
import useTyping from '../hooks/useTyping';
import { ActionIcon, Box, Group, Text } from '@mantine/core';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import useShowResultsStore from '../stores/useShowResultsStore';
import useTimerStore from '../stores/useTimerStore';
import { useInterval } from 'usehooks-ts';
import Results from './Results';

interface TypingAppProps {}

const TypingApp: React.FunctionComponent<TypingAppProps> = () => {
    const { reset, setResetBtnRef, handleKeys } = useTyping();
    const { count, decreaseCount, setPlaying, isPlaying, setCount } =
        useTimerStore();
    const resetBtn = useRef<HTMLButtonElement | null>(null);
    const { showResults, toggleResults } = useShowResultsStore();

    useEffect(() => {
        setResetBtnRef(resetBtn);
    }, [resetBtn]);

    useInterval(
        () => {
            if (count == 0) {
                setPlaying(false);
                setCount(0);
                toggleResults();
                return;
            }
            decreaseCount();
        },
        isPlaying && count > 0 ? 1000 : null
    );

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
                    <Group>
                        <Text size='xl'>{count}</Text>
                        <ActionIcon
                            ref={resetBtn}
                            className='restart'
                            onClick={reset}
                            size={'sm'}
                        >
                            <ArrowUturnLeftIcon />
                        </ActionIcon>
                    </Group>
                    <Words />
                </Box>
            )}
        </Box>
    );
};

export default TypingApp;
