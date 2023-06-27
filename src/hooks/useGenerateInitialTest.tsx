import { useEffect } from 'react';
import useGenerateTest from './useGenerateTest';
import useTypingStore from '../stores/typing';

const useGenerateInitialTest = () => {
  const { testSize, punctuation, numbers, setText } = useTypingStore();

  const generate = useGenerateTest();

  useEffect(() => {
    const initialTest = generate();
    // console.log('initialTest', initialTest);
    setText(initialTest);
  }, [testSize, punctuation, numbers]);
};

export default useGenerateInitialTest;
