import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';
import {
    lastTestLogsAtom,
    textAtom,
    typedAtom,
    typedLogAtom,
} from '../atoms/typing';

const useIsTestFinished = () => {
    const text = useAtomValue(textAtom);
    const typed = useAtomValue(typedAtom);
    const typedLog = useAtomValue(typedLogAtom);
    const setLastTestLog = useSetAtom(lastTestLogsAtom);

    if (text.length < 1) return false;
    const textArr = text.split(' ');

    const lastOfTyped = typed[textArr.length - 1];
    const lastOfText = textArr[textArr.length - 1];

    if (lastOfText == lastOfTyped || typed.length > textArr.length) {
        if (typedLog.length > 0) {
            setLastTestLog(typedLog);
        }
        console.log('test finished');

        return true;
    }

    return false;
};

export default useIsTestFinished;
