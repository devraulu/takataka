import useResetTest from './useResetTest';
import { useIdle } from '@mantine/hooks';
// import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { toast } from 'sonner';
import { showResultsAtom } from '#root/atoms/results';
import { hasTestStartedAtom, typedAtom } from '#root/atoms/typing';

let timeout: NodeJS.Timeout | null = null;

function useCheckAFK() {
    useAtomValue(typedAtom);
    const hasTestStarted = useAtomValue(hasTestStartedAtom);
    const reset = useResetTest();
    const showResults = useAtomValue(showResultsAtom);
    const run = hasTestStarted && !showResults;

    const afk = useIdle(10 * 1000, { initialState: false });

    if (timeout == null) clearTimeout(timeout);
    // useEffect(() => {
    timeout = setTimeout(() => {
        if (!run || !afk) return;
        toast.error('AFK Detected', {
            id: 'afk-toast',
            description: 'Test stopped because user is AFK',
            duration: 5000,
        });
        reset();
    }, 10 * 1000);

    // return () => clearTimeout(id);
    // }, [run, typed.length, afk]);
}

export default useCheckAFK;
