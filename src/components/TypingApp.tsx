import React, { useEffect } from 'react';
import Words from './Words';
import useTyping from '../hooks/useTyping';
import { Box, Group, Stack, em, getBreakpointValue, useMantineTheme } from '@mantine/core';
import useShowResultsStore from '../stores/results';
import Results from './Results';
import useTypedLog from '../hooks/useTypedLog';
import TestConfigBar from './TestConfigBar';
import useTypingStore from '../stores/typing';
import useGenerateInitialTest from '../hooks/useGenerateInitialTest';
import TestProgress from './TestProgress';
import RetryButton from './RetryButton';
import useCheckAFK from '../hooks/useCheckAFK';
import usePromptOverlay from '../hooks/usePromptOverlay';
import useMobileTrigger from '../hooks/useMobileTrigger';
import { isMobile } from '../utils';
import AfkOverlay from './AfkOverlay';

interface TypingAppProps {}

const TypingApp: React.FunctionComponent<TypingAppProps> = () => {
  const { handleKeys: handleKeyEvent } = useTyping();

  const hasTestStarted = useTypingStore((state) => state.hasTestStarted());

  const showResults = useShowResultsStore((state) => state.showResults);

  const theme = useMantineTheme();

  const { inputRef, isInputFocused, triggerTouchKeyboard } = useMobileTrigger();

  useTypedLog();

  const handleKeys = (event: KeyboardEvent) => {
    if (isMobile() && !isInputFocused()) {
      triggerTouchKeyboard();
    }

    handleKeyEvent(event);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeys);

    return () => {
      window.removeEventListener('keydown', handleKeys);
    };
  }, [handleKeys]);

  useGenerateInitialTest();

  useCheckAFK();

  const { show: showOverlay, close } = usePromptOverlay();

  const handleTouch = () => {
    triggerTouchKeyboard();
    close();
  };

  return (
    <Stack
      justify="center"
      maw={em(getBreakpointValue(theme.breakpoints.xl))}
      mx="auto"
      // sx={{ flex: 1 }}
      w="95%"
    >
      {showResults ? (
        <Results />
      ) : (
        <>
          <Box
            sx={{
              visibility: hasTestStarted ? 'hidden' : 'initial',
            }}
          >
            <TestConfigBar />
          </Box>
          <Box mt="md" onClick={handleTouch}>
            {isMobile() && (
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    top: '-9999px',
                  }}
                />
              </div>
            )}
            <Group mt="md" align="center">
              {hasTestStarted && <TestProgress />}
              <RetryButton />
            </Group>
            <Box sx={{ position: 'relative' }} p="md" mt="sm">
              <AfkOverlay show={showOverlay} handleTouch={handleTouch} />

              <Words />
            </Box>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default TypingApp;
