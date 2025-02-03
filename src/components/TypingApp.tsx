import { useAtomValue } from 'jotai';
import { showResultsAtom } from '../atoms/results';
import TestContainer from './TestContainer';
import { useSetAtom } from 'jotai';
import { createNewTestAtom } from '@/atoms/test_configuration';
import { lazy, Suspense, useEffect } from 'react';
import ResultsSkeleton from './ResultsSkeleton';

const Results = lazy(() => import('./Results'));

function TypingApp() {
    const showResults = useAtomValue(showResultsAtom);
    const createNewTest = useSetAtom(createNewTestAtom);

    useEffect(() => {
        createNewTest();
    }, [createNewTest]);

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
