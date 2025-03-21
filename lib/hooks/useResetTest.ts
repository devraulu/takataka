import { useAtomValue, useSetAtom } from 'jotai';
import {
    // resetBtnRefAtom,
    resetTestAtom,
    testInputRefAtom,
    testLostFocusAtom,
} from '#root/atoms/typing';
import { createNewTestAtom } from '#root/atoms/test_configuration';
import { focusInputAndScrollIntoView } from '#root/lib/utils';
import { showAfkOverlayAtom } from '#root/atoms/ui';

const useResetTest = () => {
    // const resetBtnRef = useAtomValue(resetBtnRefAtom);
    const resetTest = useSetAtom(resetTestAtom);
    const generateNewTest = useSetAtom(createNewTestAtom);
    const setShow = useSetAtom(showAfkOverlayAtom);

    const testInputRef = useAtomValue(testInputRefAtom);
    const setTestLostFocus = useSetAtom(testLostFocusAtom);

    const reset = (newTest = true) => {
        resetTest();
        // resetBtnRef?.blur();

        if (newTest) {
            generateNewTest();
        }

        setShow(false);

        if (testInputRef) {
            focusInputAndScrollIntoView(testInputRef);
            setTestLostFocus(false);
        }
    };

    return reset;
};

export default useResetTest;
