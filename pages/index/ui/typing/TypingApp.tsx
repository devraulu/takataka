import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { showResultsAtom } from '#root/atoms/results';
import TestContainer from './TestContainer';
import { useSetAtom } from 'jotai';
import { createNewTestAtom } from '#root/atoms/test_configuration';
import { testInputRefAtom } from '#root/atoms/typing';
import { focusInputAndScrollIntoView } from '#root/utils';
import ResultsContainer from '../results/ResultsContainer';

function TypingApp() {
    const showResults = useAtomValue(showResultsAtom);
    const createNewTest = useSetAtom(createNewTestAtom);
    const inputRef = useAtomValue(testInputRefAtom);

    useEffect(() => {
        createNewTest();
    }, [createNewTest]);

    useEffect(() => {
        if (inputRef) focusInputAndScrollIntoView(inputRef);
    }, [inputRef]);

    return (
        <div className={'grid grid-rows-[1fr_auto] content-grid'}>
            {showResults ? <ResultsContainer /> : <TestContainer />}
        </div>
    );
}

export default TypingApp;
