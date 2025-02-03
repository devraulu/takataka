import { useAtomValue, useSetAtom } from 'jotai';
import {
    checkedWordsAtom,
    historyAtom,
    INITIAL_TYPED,
    lastTestLogsAtom,
    resetBtnRefAtom,
    testInputRefAtom,
    testLostFocusAtom,
    typedAtom,
    typedLogAtom,
} from '../atoms/typing';
import { createNewTestAtom } from '../atoms/test_configuration';
import { showResultsAtom } from '../atoms/results';
import { focusInputAndScrollIntoView } from '@/lib/utils';

const useResetTest = () => {
    const setTyped = useSetAtom(typedAtom);
    const setTypedLog = useSetAtom(typedLogAtom);
    const setHistory = useSetAtom(historyAtom);
    const setLastTestLog = useSetAtom(lastTestLogsAtom);
    const setCheckedWords = useSetAtom(checkedWordsAtom);
    const setResults = useSetAtom(showResultsAtom);
    const resetBtnRef = useAtomValue(resetBtnRefAtom);
    const generateNewTest = useSetAtom(createNewTestAtom);

    const testInputRef = useAtomValue(testInputRefAtom);
    const setTestLostFocus = useSetAtom(testLostFocusAtom);

    const reset = (newTest = true) => {
        setTyped(INITIAL_TYPED);
        setCheckedWords([]);
        setHistory([]);
        setResults(false);
        setLastTestLog([]);
        setTypedLog([]);
        resetBtnRef?.current?.blur();
        if (newTest) generateNewTest();

        if (testInputRef && document.activeElement !== testInputRef?.current) {
            focusInputAndScrollIntoView(testInputRef);
            setTestLostFocus(false);
        }
    };

    return reset;
};

export default useResetTest;
