import { useEffect, useRef } from 'react';
import useTyping from './hooks/useTyping';
import Words from './components/Words';
import useShowResultsStore from './stores/useShowResultsStore';
import './App.scss';
import Results from './components/Results';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

function App() {
    const { count, reset, setResetBtnRef } = useTyping();
    const resetBtn = useRef<HTMLButtonElement | null>(null);
    const { showResults, toggleResults } = useShowResultsStore();

    useEffect(() => {
        setResetBtnRef(resetBtn);
    }, [resetBtn]);

    return (
        <div className='container mx-auto h-[100vh] flex flex-col'>
            {!showResults ? (
                <>
                    <div className='flex gap-x-2 mb-4'>
                        <div className='text-xl'>{count}</div>
                        <button
                            ref={resetBtn}
                            className='restart'
                            onClick={reset}
                        >
                            <ArrowUturnLeftIcon className='w-5' />
                        </button>
                    </div>

                    <Words />
                </>
            ) : (
                <Results />
            )}
        </div>
    );
}

export default App;
