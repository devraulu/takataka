import { useEffect } from 'react';
import useTypingStore from '../stores/typing';
import Log from '../models/Log';

const useTypedLog = () => {
  const [text, typed, appendTypedLog] = useTypingStore((state) => [
    state.text,
    state.typed,
    state.appendTypedLog,
  ]);

  useEffect(() => {
    if (typed.length > 0) {
      const currentWordIndex = typed.length - 1;
      const currentWord = text.split(' ')[currentWordIndex] ?? '';
      const currentTypedWord = typed[currentWordIndex] ?? '';
      const lastLetter = currentTypedWord[currentTypedWord.length - 1];

      if (lastLetter) {
        const isCorrect = lastLetter == currentWord[currentTypedWord.length - 1];
        const isExtra = currentTypedWord.length > currentWord.length;

        const logEntry: Log = {
          character: currentTypedWord[currentTypedWord.length - 1],
          timestamp: Date.now(),
          error: !isCorrect,
          extra: isExtra,
        };

        // console.log('log: ', logEntry);
        appendTypedLog(logEntry);
      }
    }
  }, [typed]);
};

export default useTypedLog;
