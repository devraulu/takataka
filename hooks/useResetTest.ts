import { useAtomValue, useSetAtom } from 'jotai';
import {
    resetBtnRefAtom,
    resetTestAtom,
    testInputRefAtom,
    testLostFocusAtom,
} from '#root/atoms/typing';
import { createNewTestAtom } from '#root/atoms/test_configuration';
import { focusInputAndScrollIntoView } from '#root/lib/utils';

const useResetTest = () => {
    const resetBtnRef = useAtomValue(resetBtnRefAtom);
    const resetTest = useSetAtom(resetTestAtom);
    const generateNewTest = useSetAtom(createNewTestAtom);

    const testInputRef = useAtomValue(testInputRefAtom);
    const setTestLostFocus = useSetAtom(testLostFocusAtom);

    const reset = (newTest = true) => {
        resetTest();
        resetBtnRef?.blur();

        if (newTest) generateNewTest();

        if (testInputRef) {
            focusInputAndScrollIntoView(testInputRef);
            setTestLostFocus(false);
        }
    };

    return reset;
};

export default useResetTest;
