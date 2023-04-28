import React, { useEffect } from 'react';
import cs from 'classnames';
import useTyping from '../hooks/useTyping';

interface WordsProps {}

const Words: React.FunctionComponent<WordsProps> = ({}) => {
    const { text, handleKeys, typed } = useTyping();

    useEffect(() => {
        window.addEventListener('keydown', handleKeys);

        return () => {
            window.removeEventListener('keydown', handleKeys);
        };
    }, [text, typed, history, handleKeys]);

    return (
        <div className='words'>
            {text.split(' ').map((word, i) => {
                const isTyped = typed.length > 0 && !!typed[i];
                const isComplete = isTyped && typed[i].length === word.length;
                // const isLastWordBeingTypedStart = typed.length === i;
                const isLastWordBeingTyped = typed.length - 1 === i;

                const isWordCorrect = isTyped && typed[i] === word;
                const isExtra =
                    typed.length > 0 &&
                    !!typed[i] &&
                    typed[i].length > word.length;
                const finalWord = isExtra
                    ? word + typed[i].slice(word.length)
                    : word;

                return (
                    <React.Fragment key={word + i}>
                        <div
                            className={cs('word', {
                                incomplete:
                                    isTyped &&
                                    !isWordCorrect &&
                                    !isLastWordBeingTyped,
                            })}
                        >
                            {finalWord.split('').map((letter, j) => {
                                const isTyped =
                                    typed.length > 0 &&
                                    !!typed[i] &&
                                    !!typed[i][j];
                                const isCorrect =
                                    isTyped && letter === typed[i][j];
                                const isExtraLetter =
                                    isExtra && j >= word.length;
                                const isLastLetterBeingTyped =
                                    isLastWordBeingTyped &&
                                    j === typed[i]?.length;

                                return (
                                    <>
                                        {isLastLetterBeingTyped && (
                                            <div className='caret '></div>
                                        )}
                                        <div
                                            className={cs('letter', {
                                                correct: isTyped && isCorrect,
                                                incorrect:
                                                    isTyped && !isCorrect,
                                                extra: isExtraLetter,
                                            })}
                                        >
                                            {letter}
                                        </div>
                                    </>
                                );
                            })}
                            {isLastWordBeingTyped && isComplete && (
                                <div className='caret '></div>
                            )}
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Words;
