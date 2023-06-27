import useShowResultsStore from '../stores/results';
import useTypingStore, { INITIAL_TYPED, resetSelector } from '../stores/typing';
import useGenerateTest from './useGenerateTest';

const useResetTest = () => {
  const { setTyped, setHistory, setLastTestLog, setTypedLog, setText, resetBtnRef } =
    useTypingStore(resetSelector);

  const setResults = useShowResultsStore((state) => state.setResults);

  const generate = useGenerateTest();

  const reset = () => {
    setTyped(INITIAL_TYPED);
    setHistory([]);
    setResults(false);
    setLastTestLog([]);
    setTypedLog([]);
    resetBtnRef.current?.blur();
  };

  const newTest = () => {
    reset();
    setText(generate());
  };

  return { reset, newTest };
};

export default useResetTest;
