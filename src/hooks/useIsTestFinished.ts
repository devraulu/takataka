import { useMemo } from 'react';
import useTypingStore, { testFinishedSelector } from '../stores/typing';

const useIsTestFinished = () => {
  const { text, typed, typedLog, setLastTestLog } = useTypingStore(testFinishedSelector);

  const isTestFinished = useMemo(() => {
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
  }, [typed]);

  return isTestFinished;
};

export default useIsTestFinished;
