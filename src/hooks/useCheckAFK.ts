import { notifications } from '@mantine/notifications';
import useTypingStore from '../stores/typing';
import useResetTest from './useResetTest';
import useShowResultsStore from '../stores/results';
import { useIdle, useTimeout } from '@mantine/hooks';
import { useEffect } from 'react';

function useCheckAFK() {
  const [typed, hasTestStarted] = useTypingStore((state) => [state.typed, state.hasTestStarted()]);
  const { reset } = useResetTest();
  const showResults = useShowResultsStore((state) => state.showResults);
  const run = hasTestStarted && !showResults;

  const afk = useIdle(1000, { initialState: false });

  const { start, clear } = useTimeout(() => {
    console.log('afk detected');
    notifications.show({
      title: 'AFK Detected',
      message: 'Test stopped because user is AFK',
      color: 'red.5',
      autoClose: false,
      withCloseButton: true,
    });
    reset();
  }, 20 * 1000);

  useEffect(() => {
    // console.log('afk', afk, run);
    if (run && afk) start();
    else clear();
  }, [run, typed, afk]);
}

export default useCheckAFK;
