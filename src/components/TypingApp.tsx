import Results from './Results';
import { useAtomValue } from 'jotai';
import { showResultsAtom } from '../atoms/results';
import TestContainer from './TestContainer';
import { useSetAtom } from 'jotai';
import { createNewTestAtom } from '@/atoms/test_configuration';
import { useEffect } from 'react';

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
            {showResults ? <Results /> : <TestContainer />}
        </div>
    );
}

export default TypingApp;
