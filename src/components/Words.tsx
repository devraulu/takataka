import React, { useEffect, useMemo } from 'react';
import useTyping from '../hooks/useTyping';
import { a, useSpring } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { Box, Flex, rem, useMantineTheme } from '@mantine/core';
import { css } from '@emotion/react';

interface WordsProps {}

const Words: React.FunctionComponent<WordsProps> = ({}) => {
    const { text, typed } = useTyping();
    const [letterRef, { left }] = useMeasure();
    const [wordRef, { top }] = useMeasure();

    const props = useSpring({
        left,
        top,
        config: {
            mass: 0.5,
            tension: 246,
            friction: 14,
        },
    });

    const words = useMemo(() => text.split(' '), [text]);

    const theme = useMantineTheme();

    const correctStyles = css`
        color: ${theme.colors.blue[5]};
    `;
    const incorrectStyles = css`
        color: ${theme.colors.red[5]};
    `;
    const extraStyles = css`
        color: ${theme.colors.red[9]};
    `;

    return (
        <>
            <a.div
                style={{
                    background: 'black',
                    width: rem(2),
                    height: rem(24),
                    position: 'absolute',
                    ...props,
                }}
            />
            <Box>
                <Flex
                    wrap='wrap'
                    sx={{ fontFamily: '"Space Mono", monospace' }}
                >
                    {words.map((word, i) => {
                        const isTyped = typed.length > 0 && !!typed[i];
                        const isComplete =
                            isTyped && typed[i].length === word.length;
                        const isLastWordBeingTyped = typed.length - 1 === i;

                        const isWordCorrect = isTyped && typed[i] === word;
                        const isExtra =
                            typed.length > 0 &&
                            !!typed[i] &&
                            typed[i].length > word.length;
                        const finalWord = `${word}${
                            typed[i]?.slice(word.length) ?? ' '
                        }`;

                        const incorrectlyTypedWord =
                            isTyped && !isWordCorrect && !isLastWordBeingTyped;

                        const wordStyles = css`
                            border-bottom: ${incorrectlyTypedWord ? rem(2) : 0}
                                solid ${theme.colors.red[5]};
                            display: flex;
                            flex-wrap: nowrap;
                        `;

                        return (
                            <div
                                css={css`
                                    display: flex;
                                    flex-wrap: nowrap;
                                `}
                                key={word + i}
                            >
                                <div
                                    ref={
                                        isLastWordBeingTyped
                                            ? wordRef
                                            : undefined
                                    }
                                    css={wordStyles}
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

                                        let letterStyles;

                                        if (isTyped)
                                            if (isCorrect)
                                                letterStyles = correctStyles;
                                            else letterStyles = incorrectStyles;
                                        if (isExtraLetter)
                                            letterStyles = extraStyles;

                                        return (
                                            <React.Fragment key={word + j}>
                                                <div
                                                    ref={
                                                        isLastLetterBeingTyped
                                                            ? letterRef
                                                            : undefined
                                                    }
                                                    css={letterStyles}
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
                                            </React.Fragment>
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
                            </div>
                        );
                    })}
                </Flex>
            </Box>
        </>
    );
};

export default Words;
