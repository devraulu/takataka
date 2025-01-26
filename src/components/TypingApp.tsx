import { useAtomValue } from 'jotai';
import { showResultsAtom } from '../atoms/results';
import TestContainer from './TestContainer';
import { useSetAtom } from 'jotai';
import { createNewTestAtom } from '@/atoms/test_configuration';
import { lazy, Suspense, useEffect } from 'react';

const Results = lazy(() => import('./Results'));

function TypingApp() {
    const showResults = useAtomValue(showResultsAtom);
    const createNewTest = useSetAtom(createNewTestAtom);

    useEffect(
        () => {
            createNewTest();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <div className={'grid grid-rows-[1fr_auto] gap-y-8 content-grid'}>
            <Suspense fallback={<div>Loading...</div>}>
                {showResults ? <Results /> : <TestContainer />}
            </Suspense>
        </div>
    );
}

export default TypingApp;
