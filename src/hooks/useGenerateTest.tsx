import useTypingStore from '../stores/typing';
import { generateTest } from '../utils/random-words';

const useGenerateTest = () => {
  const { testSize, punctuation, numbers } = useTypingStore();
  return () => generateTest(testSize, punctuation, numbers);
};

export default useGenerateTest;
