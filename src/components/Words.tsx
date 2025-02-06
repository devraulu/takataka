import Caret from './Caret';
import useRenderWords from '../hooks/useRenderWords';
import { useRef } from 'react';
import useTypedLog from '../hooks/useTypedLog';
import clsx from 'clsx';
import ShowAfterDelay from './ShowAfterDelay';

function Words() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { width: containerWidth } =
        containerRef.current?.getBoundingClientRect() ?? { width: 0 };

    const fontRef = useRef<HTMLSpanElement | null>(null);
    const { height: fontHeight, width: fontWidth } =
        fontRef.current?.getBoundingClientRect() ?? { height: 0, width: 0 };

    const words = useRenderWords(fontWidth, containerWidth);
    const fz = 30;

    useTypedLog();

    return (
        <div ref={containerRef} className='font-variation-mono relative'>
            {/* We use this letter to measure the current size of the letters and spaces we're displaying */}
            <span
                ref={fontRef}
                className={'fixed invisible'}
                style={{ fontSize: fz }}
            >
                a
            </span>

            <Caret containerRef={containerRef} fontHeight={fontHeight} />

            <ShowAfterDelay>
                {words.length > 0 && (
                    <div
                        className={'focus:outline-hidden '}
                        style={{ fontSize: fz }}
                    >
                        <div className='flex flex-wrap'>
                            {words.map((elem, i) => {
                                const {
                                    word,
                                    incorrectlyTypedWord,
                                    letters,
                                    isComplete,
                                    index: wordIndex,
                                } = elem;

                                return (
                                    <div
                                        key={word + i}
                                        className='flex flex-nowrap'
                                    >
                                        <div
                                            className={clsx(
                                                'flex flex-nowrap',
                                                {
                                                    'border-b':
                                                        incorrectlyTypedWord,
                                                },
                                                incorrectlyTypedWord
                                                    ? 'border-error'
                                                    : 'border-sub',
                                            )}
                                            data-word={word}
                                            data-index={wordIndex}
                                            data-active={isComplete}
                                        >
                                            {letters.map(
                                                (
                                                    {
                                                        letter,
                                                        isCorrect,
                                                        isTyped,
                                                        isExtraLetter,
                                                    },
                                                    j,
                                                ) => {
                                                    return (
                                                        <div
                                                            key={word + j}
                                                            className={clsx(
                                                                'font-medium',
                                                                getTextColor(
                                                                    isTyped,
                                                                    isCorrect,
                                                                    isExtraLetter,
                                                                ),
                                                            )}
                                                            data-letter={letter}
                                                            data-index={j}
                                                            data-extra={
                                                                isExtraLetter
                                                            }
                                                            data-typed={isTyped}
                                                        >
                                                            {letter}
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                        <div className='whitespace'>&nbsp;</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </ShowAfterDelay>
        </div>
    );
}

const getTextColor = (
    isTyped?: boolean,
    isCorrect?: boolean,
    isExtra?: boolean,
): string => {
    let color = 'text-sub';

    if (isTyped)
        if (isCorrect) color = 'text-main';
        else color = 'text-error';
    if (isExtra) color = 'text-error-extra';

    return color;
};

export default Words;
