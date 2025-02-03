import { useAtomValue } from 'jotai';
import { showResultsAtom } from '../atoms/results';
import TestContainer from './TestContainer';
import { useSetAtom } from 'jotai';
import { createNewTestAtom } from '@/atoms/test_configuration';
import { lazy, Suspense, useEffect } from 'react';
import ResultsSkeleton from './ResultsSkeleton';
import { testInputRefAtom as inputRefAtom } from '@/atoms/typing';
import { focusInputAndScrollIntoView } from '@/lib/utils';

const Results = lazy(() => import('./Results'));

function TypingApp() {
    const showResults = useAtomValue(showResultsAtom);
    const createNewTest = useSetAtom(createNewTestAtom);
    const inputRef = useAtomValue(inputRefAtom);

    useEffect(() => {
        createNewTest();
    }, [createNewTest]);

    useEffect(() => {
        if (inputRef) focusInputAndScrollIntoView(inputRef);
    }, [inputRef]);

    return (
        <div className={'grid grid-rows-[1fr_auto] content-grid'}>
            {showResults ? (
                <Suspense fallback={<ResultsSkeleton />}>
                    <Results />
                </Suspense>
            ) : (
                <TestContainer />
            )}
        </div>
    );
}

export default TypingApp;
