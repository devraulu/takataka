import useMeasure from 'react-use-measure';
import Caret from './Caret';
import useRenderWords from '../hooks/useRenderWords';
import React, { useEffect, useRef } from 'react';
import useTypedLog from '../hooks/useTypedLog';
import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import { wordsContainerRefAtom } from '@/atoms/typing';
import { useMergedRef } from '@mantine/hooks';

function Words() {
    const [measureRef, { width: containerWidth }] = useMeasure({
        debounce: 200,
    });

    const wordsContainerRef = useRef<HTMLDivElement | null>(null);
    const mergedWordsContainerRef = useMergedRef(wordsContainerRef, measureRef);
    const setContainerRef = useSetAtom(wordsContainerRefAtom);

    useEffect(() => {
        setContainerRef(wordsContainerRef);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wordsContainerRef]);

    const [fontRef, { height: fontHeight }] = useMeasure();
    const [letterRef, { left, top }] = useMeasure();

    const fz = 20;
    const words = useRenderWords(fz, containerWidth);

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
            color: `rgb(var(--${color}))`,
        };
    };

    return (
        <div>
            {/* We use this letter to measure the current size of the letters and spaces we're displaying */}
            {/* WARN: Is this really necessary? Since we know the font size beforehand */}
            <span
                ref={fontRef}
                className={'fixed invisible font-mono'}
                style={{ fontSize: fz }}
            >
                a
            </span>
            <Caret top={top} left={left} fontHeight={fontHeight} />
            {words.length > 0 && (
                <div
                    ref={mergedWordsContainerRef}
                    tabIndex={1}
                    autoFocus
                    className={'focus:outline-none font-mono'}
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
                                                                'font-mono font-semibold ',
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
                                        // style={{ width: fontWidth }}
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
