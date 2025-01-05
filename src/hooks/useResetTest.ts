import { useAtomValue, useSetAtom } from 'jotai';
import {
    historyAtom,
    INITIAL_TYPED,
    lastTestLogsAtom,
    resetBtnRefAtom,
    typedAtom,
    typedLogAtom,
} from '../atoms/typing';
import { createNewTestAtom } from '../atoms/test_configuration';
import { showResultsAtom } from '../atoms/results';

const useResetTest = () => {
    const setTyped = useSetAtom(typedAtom);
    const setTypedLog = useSetAtom(typedLogAtom);
    const setHistory = useSetAtom(historyAtom);
    const setLastTestLog = useSetAtom(lastTestLogsAtom);

    const setResults = useSetAtom(showResultsAtom);

    const resetBtnRef = useAtomValue(resetBtnRefAtom);

    const createNewTest = useSetAtom(createNewTestAtom);

    const reset = () => {
        setTyped(INITIAL_TYPED);
        setHistory([]);
        setResults(false);
        setLastTestLog([]);
        setTypedLog([]);
        resetBtnRef?.current?.blur();
    };

    const newTest = () => {
        reset();
        createNewTest();
    };

    return { reset, newTest };
};

export default useResetTest;
