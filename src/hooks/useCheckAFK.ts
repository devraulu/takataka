import useResetTest from './useResetTest';
import { useIdle, useTimeout } from '@mantine/hooks';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { hasTestStartedAtom, typedAtom } from '../atoms/typing';
import { showResultsAtom } from '../atoms/results';
import { toast } from 'sonner';

function useCheckAFK() {
    const typed = useAtomValue(typedAtom);
    const hasTestStarted = useAtomValue(hasTestStartedAtom);
    const reset = useResetTest();
    const showResults = useAtomValue(showResultsAtom);
    const run = hasTestStarted && !showResults;

    const afk = useIdle(1000, { initialState: false });

    const { start, clear } = useTimeout(() => {
        toast.error('AFK Detected', {
            id: 'afk-toast',
            description: 'Test stopped because user is AFK',
            duration: 5000,
        });
        reset();
    }, 10 * 1000);

    useEffect(() => {
        if (run && afk) {
            start();
        } else clear();
    }, [run, typed.length, afk]);
}

export default useCheckAFK;
