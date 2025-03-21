import { useAtomValue, useSetAtom } from 'jotai';
import {
    lastTestResultsAtom,
    textAtom,
    typedAtom,
    typedLogAtom,
} from '#root/atoms/typing';
import { testConfigurationAtom } from '#root/atoms/test_configuration';
import axios from 'axios';

const useIsTestFinished = () => {
    const text = useAtomValue(textAtom);
    const typed = useAtomValue(typedAtom);
    const typedLog = useAtomValue(typedLogAtom);
    const testConfiguration = useAtomValue(testConfigurationAtom);
    const setLastTestLog = useSetAtom(lastTestResultsAtom);

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

    if (finishedTest && typedLog.length > 0) {
        const lastResults = {
            logs: typedLog,
            testConfiguration,
            createdAt: new Date(),
            synced: false,
        };

        axios
            .post('/api/results', lastResults)
            .then(() => {
                lastResults.synced = true;
            })
            .catch(e => {})
            .finally(() => setLastTestLog(lastResults));
    }

    return finishedTest;
};

export default useIsTestFinished;
