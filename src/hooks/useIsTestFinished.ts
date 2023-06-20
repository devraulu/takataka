import { useMemo } from 'react';
import useTypingStore from '../stores/useTypingStore';

const useIsTestFinished = () => {
    const { text, typed, typedLog, setLastTestLog } = useTypingStore();

    const isTestFinished = useMemo(() => {
        const textArr = text.split(' ');

        const lastOfTyped = typed[textArr.length - 1];
        const lastOfText = textArr[textArr.length - 1];

        if (lastOfText == lastOfTyped || typed.length > textArr.length) {
            if (typedLog.length > 0) {
                // console.log('setting last test log to', typedLog);
                setLastTestLog(typedLog);
            }
            console.log(
                'test finished'
                //  typedLog, lastTestLogs
            );

            return true;
        }

        return false;
    }, [typed]);

    return isTestFinished;
};

export default useIsTestFinished;
