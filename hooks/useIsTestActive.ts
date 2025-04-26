import { useAtomValue } from 'jotai';
import useIsTestFinished from './useIsTestFinished';
import { hasTestStartedAtom, testLostFocusAtom } from '#root/atoms/typing';

export default function useIsTestActive() {
    const hasTestStarted = useAtomValue(hasTestStartedAtom);
    const isTestFinished = useIsTestFinished();
    const testLostFocus = useAtomValue(testLostFocusAtom);

    return hasTestStarted && !isTestFinished && !testLostFocus;
}
