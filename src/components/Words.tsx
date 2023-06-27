import React, { useState } from 'react';
import useMeasure from 'react-use-measure';
import { Box, Flex, rem, useMantineTheme } from '@mantine/core';
import { css } from '@emotion/react';
import Caret from './Caret';
import useRenderWords from '../hooks/useRenderWords';
import useTypingStore from '../stores/typing';

type WordsProps = unknown;

const Words: React.FunctionComponent<WordsProps> = ({}) => {
  const [containerRef, { width: containerWidth }] = useMeasure({
    debounce: 200,
  });
  const [fontRef, { width: fontWidth }] = useMeasure();
  const [letterRef, { left, top }] = useMeasure();

  const [fz] = useState(24);

  const words = useRenderWords(fontWidth, containerWidth);

  const hasTestStarted = useTypingStore((state) => state.hasTestStarted());

  const theme = useMantineTheme();

  const fontStyles = (isTyped?: boolean, isCorrect?: boolean, isExtra?: boolean) => {
    let color = theme.colors.tertiary['5'];

    if (isTyped)
      if (isCorrect) color = theme.colors.secondary['5'];
      else color = theme.colors.red['5'];
    if (isExtra) color = theme.colors.red['8'];

    return css`
      font-family: 'Jetbrains Mono', monospace;
      color: ${color};
      font-size: ${rem(fz)};
      word-spacing: ${rem(200)};
    `;
  };

  return (
    <Box>
      {/* We use this letter to measure the current size of the letters and spaces we're displaying */}
      <span
        ref={fontRef}
        css={css`
          ${fontStyles()}
          position: fixed;
          visibility: hidden;
        `}
      >
        a
      </span>
      {hasTestStarted && <Caret top={top} left={left} />}
      {words.length > 0 && (
        <Box ref={containerRef}>
          <Flex wrap="wrap">
            {words.map((elem, i) => {
              const { word, incorrectlyTypedWord, letters, isComplete, isLastWordBeingTyped } =
                elem;
              const wordStyles = css`
                border-bottom: ${incorrectlyTypedWord ? rem(2) : 0} solid ${theme.colors.red[5]};
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
                  <div css={wordStyles}>
                    {letters.map(
                      (
                        { letter, isLastLetterBeingTyped, isCorrect, isTyped, isExtraLetter },
                        j
                      ) => {
                        return (
                          <React.Fragment key={word + j}>
                            <div
                              ref={isLastLetterBeingTyped ? letterRef : undefined}
                              css={fontStyles(isTyped, isCorrect, isExtraLetter)}
                            >
                              {letter}
                            </div>

                            <div ref={isExtraLetter ? letterRef : undefined} />
                          </React.Fragment>
                        );
                      }
                    )}
                  </div>
                  <div
                    ref={isLastWordBeingTyped && isComplete ? letterRef : undefined}
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
};

export default Words;
