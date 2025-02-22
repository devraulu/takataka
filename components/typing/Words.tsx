import React from 'react';
import Caret from './Caret';
import useRenderWords from './hooks/useRenderWords';
import { useRef } from 'react';
import clsx from 'clsx';
import ShowAfterDelay from '#root/components/animations/show-after-delay';
import { LetterStat, WordStat } from '#root/types/word-stat';

function Words() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { width: containerWidth } =
        containerRef.current?.getBoundingClientRect() ?? { width: 0 };

    const fontRef = useRef<HTMLSpanElement | null>(null);
    const { height: fontHeight, width: fontWidth } =
        fontRef.current?.getBoundingClientRect() ?? { height: 0, width: 0 };

    const words = useRenderWords(fontWidth, containerWidth);

    const fz = 30;

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
                        <div className='flex flex-wrap' id='words-container'>
                            {words.map((stats, i) => {
                                return (
                                    <Word key={stats.word + i} stats={stats} />
                                );
                            })}
                        </div>
                    </div>
                )}
            </ShowAfterDelay>
        </div>
    );
}

const Word = ({ stats }: { stats: WordStat }) => {
    const {
        word,
        incorrectlyTypedWord,
        letters,
        isComplete,
        index: wordIndex,
    } = stats;

    return (
        <div className='flex flex-nowrap'>
            <div
                className={clsx(
                    'flex flex-nowrap',
                    incorrectlyTypedWord && 'border-b',
                    incorrectlyTypedWord ? 'border-error' : 'border-sub',
                )}
                data-word={word}
                data-index={wordIndex}
                data-active={isComplete}
            >
                {letters.map((letter, j) => {
                    return <Letter key={word + j} stats={letter} index={j} />;
                })}
            </div>
            <div className='whitespace'>&nbsp;</div>
        </div>
    );
};

const Letter = ({
    stats: { letter, isCorrect, isTyped, isExtraLetter },
    index,
}: {
    stats: LetterStat;
    index: number;
}) => (
    <div
        className={clsx(
            'font-medium',
            getTextColor(isTyped, isCorrect, isExtraLetter),
        )}
        data-letter={letter}
        data-index={index}
        data-extra={isExtraLetter}
        data-typed={isTyped}
    >
        {letter}
    </div>
);

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
