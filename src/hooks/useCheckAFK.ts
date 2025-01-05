import { notifications } from '@mantine/notifications';
import useResetTest from './useResetTest';
import { useIdle, useTimeout } from '@mantine/hooks';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { hasTestStartedAtom, typedAtom } from '../atoms/typing';
import { showResultsAtom } from '../atoms/results';

function useCheckAFK() {
    const typed = useAtomValue(typedAtom);
    const hasTestStarted = useAtomValue(hasTestStartedAtom);
    const { reset } = useResetTest();
    const showResults = useAtomValue(showResultsAtom);
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
