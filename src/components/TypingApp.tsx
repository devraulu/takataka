import Results from './Results';
import { useAtomValue } from 'jotai';
import { showResultsAtom } from '../atoms/results';
import TestContainer from './TestContainer';

function TypingApp() {
    const showResults = useAtomValue(showResultsAtom);

    return (
        <div className={'grid grid-rows-[1fr_auto_1fr] content-grid'}>
            {showResults ? <Results /> : <TestContainer />}
        </div>
    );
}

export default TypingApp;
