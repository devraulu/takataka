import useMeasure from 'react-use-measure';
import { Box, Flex, rem, useMantineTheme } from '@mantine/core';
import Caret from './Caret';
import useRenderWords from '../hooks/useRenderWords';
import React from 'react';
import useTypedLog from '../hooks/useTypedLog';

function Words() {
    const [containerRef, { width: containerWidth }] = useMeasure({
        debounce: 200,
    });
    const [fontRef, { width: fontWidth }] = useMeasure();
    const [letterRef, { left, top }] = useMeasure();

    const words = useRenderWords(fontWidth, containerWidth);
    const theme = useMantineTheme();

    useTypedLog();

    const fz = 24;

    const fontStyles = (
        isTyped?: boolean,
        isCorrect?: boolean,
        isExtra?: boolean,
    ): React.CSSProperties => {
        let color = theme.colors.tertiary['5'];

        if (isTyped)
            if (isCorrect) color = theme.colors.secondary['5'];
            else color = theme.colors.red['5'];
        if (isExtra) color = theme.colors.red['8'];

        return {
            fontFamily: "'Jetbrains Mono', monospace",
            color: color,
            fontSize: fz,
            wordSpacing: 200,
        };
    };

    return (
        <Box>
            {/* We use this letter to measure the current size of the letters and spaces we're displaying */}
            <span
                ref={fontRef}
                style={{
                    ...fontStyles(),
                    position: 'fixed',
                    visibility: 'hidden',
                }}
            >
                a
            </span>
            <Caret top={top} left={left} />
            {words.length > 0 && (
                <Box ref={containerRef}>
                    <Flex wrap='wrap'>
                        {words.map((elem, i) => {
                            const {
                                word,
                                incorrectlyTypedWord,
                                letters,
                                isComplete,
                                isLastWordBeingTyped,
                            } = elem;

                            const wordStyles: React.CSSProperties = {
                                borderBottom: incorrectlyTypedWord ? rem(2) : 0,
                                borderColor: incorrectlyTypedWord
                                    ? theme.colors.red[5]
                                    : theme.colors.tertiary[5],
                                display: 'flex',
                                flexWrap: 'nowrap',
                            };

                            return (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'nowrap',
                                    }}
                                    key={word + i}
                                >
                                    <div style={wordStyles}>
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
                                                            style={fontStyles(
                                                                isTyped,
                                                                isCorrect,
                                                                isExtraLetter,
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
                                        style={{ width: fontWidth }}
                                    >
                                        &nbsp;
                                    </div>
                                </div>
                            );
                        })}
                    </Flex>
                </Box>
            )}
        </Box>
    );
}

export default Words;
