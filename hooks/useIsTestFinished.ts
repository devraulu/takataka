import { useAtomValue, useSetAtom } from 'jotai';
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

    const finishedLastWordCorrectly = lastOfText == lastOfTyped;
    const typedMoreWordsThanTestLength = typed.length > textArr.length;
    const typedMoreLettersThanLastWordLength =
        lastOfTyped?.length > lastOfText?.length;

    const finishedTest =
        finishedLastWordCorrectly ||
        typedMoreWordsThanTestLength ||
        typedMoreLettersThanLastWordLength;

    if (finishedTest && typedLog.length > 0) setLastTestLog(typedLog);

    return finishedTest;
};

export default useIsTestFinished;
