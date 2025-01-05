import React from 'react';
import { Stack, em, getBreakpointValue, useMantineTheme } from '@mantine/core';
import Results from './Results';
import { useAtomValue } from 'jotai';
import { showResultsAtom } from '../atoms/results';
import TestContainer from './TestContainer';

interface TypingAppProps {}

const TypingApp: React.FunctionComponent<TypingAppProps> = () => {
    console.log('typing app rendered');

    const theme = useMantineTheme();

    const showResults = useAtomValue(showResultsAtom);

    return (
        <Stack
            justify='center'
            maw={em(getBreakpointValue(theme.breakpoints.xl))}
            mx='auto'
            w='95%'
        >
            {showResults ? <Results /> : <TestContainer />}
        </Stack>
    );
};

export default TypingApp;
