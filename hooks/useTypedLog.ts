import { useEffect } from 'react';
import Log from '../models/Log';
import { useAtomValue, useSetAtom } from 'jotai';
import { appendTypedLogAtom, textAtom, typedAtom } from '../atoms/typing';

const useTypedLog = () => {
    const text = useAtomValue(textAtom);
    const typed = useAtomValue(typedAtom);
    const appendTypedLog = useSetAtom(appendTypedLogAtom);

    useEffect(() => {
        if (typed.length > 0) {
            const currentWordIndex = typed.length - 1;
            const currentWord = text.split(' ')[currentWordIndex] ?? '';
            const currentTypedWord = typed[currentWordIndex] ?? '';
            const lastLetter = currentTypedWord[currentTypedWord.length - 1];

            if (lastLetter) {
                const isCorrect =
                    lastLetter == currentWord[currentTypedWord.length - 1];
                const isExtra = currentTypedWord.length > currentWord.length;

                const logEntry: Log = {
                    character: currentTypedWord[currentTypedWord.length - 1],
                    timestamp: Date.now(),
                    error: !isCorrect,
                    extra: isExtra,
                };

                appendTypedLog(logEntry);
            }
        }
    }, [typed]);
};

export default useTypedLog;
