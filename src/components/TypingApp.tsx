import Results from './Results';
import { useAtomValue } from 'jotai';
import { showResultsAtom } from '../atoms/results';
import TestContainer from './TestContainer';

function TypingApp() {
    const showResults = useAtomValue(showResultsAtom);

    return (
        <div className={'flex justify-center max-w-xl mx-auto w-11/12'}>
            {showResults ? <Results /> : <TestContainer />}
        </div>
    );
}

export default TypingApp;
