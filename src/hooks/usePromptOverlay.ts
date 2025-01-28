import { useIdle } from '@mantine/hooks';
import { useEffect } from 'react';
import { hasTestStartedAtom } from '../atoms/typing';
import { useAtom, useAtomValue } from 'jotai';
import { showAfkOverlayAtom } from '../atoms/ui';

function usePromptOverlay() {
    const idle = useIdle(10 * 1000, { initialState: false });
    const hasTestStarted = useAtomValue(hasTestStartedAtom);

    const [show, setShow] = useAtom(showAfkOverlayAtom);

    const open = () => setShow(true);
    const close = () => setShow(false);
    const toggle = () => setShow(prev => !prev);

    useEffect(() => {
        if (idle && !hasTestStarted) open();
        if (hasTestStarted) close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idle, hasTestStarted]);

    return {
        show,
        open,
        close,
        toggle,
    };
}

export default usePromptOverlay;
