import React, { useEffect } from 'react';
import cs from 'classnames';
import useTyping from '../hooks/useTyping';
import { a, animated, useSpring } from '@react-spring/web';
import useMeasure from 'react-use-measure';

interface WordsProps {}

const Words: React.FunctionComponent<WordsProps> = ({}) => {
    const { text, handleKeys, typed } = useTyping();
    const [letterRef, { left }] = useMeasure();
    const [wordRef, { top }] = useMeasure();
    const config = {
        tension: 120,
        friction: 14,
    };
    const props = useSpring({ left, top });

    useEffect(() => {
        window.addEventListener('keydown', handleKeys);

        return () => {
            window.removeEventListener('keydown', handleKeys);
        };
    }, [text, typed, history, handleKeys]);

    return (
        <>
            <a.div className='caret' style={props} />
            <div className='words'>
                {text.split(' ').map((word, i) => {
                    const isTyped = typed.length > 0 && !!typed[i];
                    const isComplete =
                        isTyped && typed[i].length === word.length;
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
                                ref={isLastWordBeingTyped ? wordRef : undefined}
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
                                    if (isLastLetterBeingTyped)
                                        console.log(
                                            'isLastLetterBeingTyped',
                                            isLastLetterBeingTyped,
                                            letter
                                        );
                                    return (
                                        <>
                                            <div
                                                ref={
                                                    isLastLetterBeingTyped
                                                        ? // || isExtraLetter
                                                          letterRef
                                                        : undefined
                                                }
                                                className={cs('letter', {
                                                    correct:
                                                        isTyped && isCorrect,
                                                    incorrect:
                                                        isTyped && !isCorrect,
                                                    extra: isExtraLetter,
                                                })}
                                            >
                                                {letter}
                                            </div>
                                            <div
                                                ref={
                                                    isExtraLetter
                                                        ? letterRef
                                                        : undefined
                                                }
                                            ></div>
                                        </>
                                    );
                                })}
                            </div>
                            <div
                                ref={
                                    isLastWordBeingTyped && isComplete
                                        ? letterRef
                                        : undefined
                                }
                            >
                                &nbsp;
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    );
};

export default Words;
