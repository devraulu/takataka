import Results from './Results';
import { useAtomValue } from 'jotai';
import { showResultsAtom } from '../atoms/results';
import TestContainer from './TestContainer';

function TypingApp() {
    const showResults = useAtomValue(showResultsAtom);

    return (
        <div className={'flex flex-col justify-center max-w-screen-xl mx-auto w-11/12'}>
            {showResults ? <Results /> : <TestContainer />}
        </div>
    );
}

export default TypingApp;
