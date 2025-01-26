import useMeasure from 'react-use-measure';
import Caret from './Caret';
import useRenderWords from '../hooks/useRenderWords';
import React from 'react';
import useTypedLog from '../hooks/useTypedLog';
import clsx from 'clsx';

// TODO: Refactor rendering logic, this is a mess
// some early thoughts:
//
// * Use a single ref for the container
// * Use add data attributes to each letter to be able to query them
// * Programmatically assign classes depending on the state
// * Track the current letter index by its data attribute by counting the words + letters typed
// * Find a way to reduce the amount of rerenders

function Words() {
    const [measureRef, { width: containerWidth }] = useMeasure({
        debounce: 200,
    });

    const [fontRef, { height: fontHeight, width: fontWidth }] = useMeasure();
    const [letterRef, { left, top }] = useMeasure();

    const words = useRenderWords(fontWidth, containerWidth);
    const fz = 24;

    useTypedLog();

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

    return (
        <div className='font-variation-mono'>
            {/* We use this letter to measure the current size of the letters and spaces we're displaying */}
            {/* WARN: Is this really necessary? Since we know the font size beforehand */}
            {/* At the moment this is used because even though the font size is fixed, the width may vary based on the weight */}
            <span
                ref={fontRef}
                className={'fixed invisible '}
                style={{ fontSize: fz }}
            >
                a
            </span>

            <Caret top={top} left={left} fontHeight={fontHeight} />

            {words.length > 0 && (
                <div
                    ref={measureRef}
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
                                                            ref={
                                                                isLastLetterBeingTyped
                                                                    ? letterRef
                                                                    : undefined
                                                            }
                                                            style={getTextColor(
                                                                isTyped,
                                                                isCorrect,
                                                                isExtraLetter,
                                                            )}
                                                            className={clsx(
                                                                ' font-semibold ',
                                                            )}
                                                        >
                                                            {letter}
                                                        </div>

                                                        <div
                                                            ref={
                                                                isExtraLetter
                                                                    ? letterRef
                                                                    : undefined
                                                            }
                                                        />
                                                    </React.Fragment>
                                                );
                                            },
                                        )}
                                    </div>
                                    <div
                                        ref={
                                            isLastWordBeingTyped && isComplete
                                                ? letterRef
                                                : undefined
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
        </div>
    );
}

export default Words;
