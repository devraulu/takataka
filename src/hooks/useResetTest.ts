import { useAtomValue, useSetAtom } from 'jotai';
import {
    resetBtnRefAtom,
    resetTestAtom,
    testInputRefAtom,
    testLostFocusAtom,
} from '../atoms/typing';
import { createNewTestAtom } from '../atoms/test_configuration';
import { focusInputAndScrollIntoView } from '@/lib/utils';

const useResetTest = () => {
    const resetBtnRef = useAtomValue(resetBtnRefAtom);
    const resetTest = useSetAtom(resetTestAtom);
    const generateNewTest = useSetAtom(createNewTestAtom);

    const testInputRef = useAtomValue(testInputRefAtom);
    const setTestLostFocus = useSetAtom(testLostFocusAtom);

    const reset = (newTest = true) => {
        resetTest();
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
