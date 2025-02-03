import { useAtomValue, useSetAtom } from 'jotai';
import {
    checkedWordsAtom,
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
    const setCheckedWords = useSetAtom(checkedWordsAtom);
    const setResults = useSetAtom(showResultsAtom);
    const resetBtnRef = useAtomValue(resetBtnRefAtom);
    const generateNewTest = useSetAtom(createNewTestAtom);

    const reset = () => {
        setTyped(INITIAL_TYPED);
        setCheckedWords([]);
        setHistory([]);
        setResults(false);
        setLastTestLog([]);
        setTypedLog([]);
        resetBtnRef?.current?.blur();
    };

    const createNewTest = () => {
        reset();
        generateNewTest();
    };

    return { reset, createNewTest };
};

export default useResetTest;
