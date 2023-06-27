import { useDisclosure, useIdle } from '@mantine/hooks';
import { useEffect } from 'react';
import useTypingStore from '../stores/typing';

function usePromptOverlay() {
  const idle = useIdle(5000, { initialState: false });
  const hasTestStarted = useTypingStore((state) => state.hasTestStarted());

  const [show, { open, close, toggle }] = useDisclosure(false);

  useEffect(() => {
    if (idle && !hasTestStarted) open();
    if (hasTestStarted) close();
  }, [idle, hasTestStarted]);

  return { show, open, close, toggle };
}

export default usePromptOverlay;
