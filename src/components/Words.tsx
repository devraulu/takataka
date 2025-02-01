import Caret from './Caret';
import useRenderWords from '../hooks/useRenderWords';
import React, { useRef } from 'react';
import useTypedLog from '../hooks/useTypedLog';
import clsx from 'clsx';
import { motion } from 'motion/react';

// TODO: Refactor rendering logic, this is a bit of a mess
// some early thoughts:
//
// * Use a single ref for the container
// * Use add data attributes to each letter to be able to query them
// * Programmatically assign classes depending on the state
// * Track the current letter index by its data attribute by counting the words + letters typed
// * Find a way to reduce the amount of rerenders
// * Only render lines that are visible, or at least remove lines that already been typed

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
        <motion.div className='font-variation-mono'>
            {/* We use this letter to measure the current size of the letters and spaces we're displaying */}
            <span
                ref={fontRef}
                className={'fixed invisible '}
                style={{ fontSize: fz }}
            >
                a
            </span>

            <Caret containerRef={containerRef} fontHeight={fontHeight} />

            {words.length > 0 && (
                <div
                    ref={containerRef}
                    className={'focus:outline-none '}
                    style={{ fontSize: fz }}
                >
                    <div className='flex flex-wrap'>
                        {words.map((elem, i) => {
                            const {
                                word,
                                incorrectlyTypedWord,
                                letters,
                                isComplete,
                                isLastWordBeingTyped,
                            } = elem;

                            return (
                                <div
                                    key={word + i}
                                    className='flex flex-nowrap word'
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
                                        data-index={i}
                                    >
                                        {letters.map(
                                            (
                                                {
                                                    letter,
                                                    isLastLetterBeingTyped,
                                                    isCorrect,
                                                    isTyped,
                                                    isExtraLetter,
                                                },
                                                j,
                                            ) => {
                                                return (
                                                    <React.Fragment
                                                        key={word + j}
                                                    >
                                                        <div
                                                            style={getTextColor(
                                                                isTyped,
                                                                isCorrect,
                                                                isExtraLetter,
                                                            )}
                                                            className={
                                                                'font-semibold letter'
                                                            }
                                                            data-active={
                                                                isLastLetterBeingTyped
                                                            }
                                                            data-extra={
                                                                isExtraLetter
                                                            }
                                                        >
                                                            {letter}
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            },
                                        )}
                                    </div>
                                    <div
                                        data-active={
                                            isLastWordBeingTyped && isComplete
                                        }
                                        className='whitespace'
                                    >
                                        &nbsp;
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

const getTextColor = (
    isTyped?: boolean,
    isCorrect?: boolean,
    isExtra?: boolean,
): React.CSSProperties => {
    let color = 'sub-color';

    if (isTyped)
        if (isCorrect) color = 'main-color';
        else color = 'error-color';
    if (isExtra) color = 'error-extra-color';

    return {
        color: `oklch(var(--${color}))`,
    };
};

export default Words;
