import { useIdle } from '@mantine/hooks';
import { useEffect } from 'react';
import { hasTestStartedAtom } from '../atoms/typing';
import { useAtom, useAtomValue } from 'jotai';
import { showAfkOverlayAtom } from '../atoms/ui';

function usePromptOverlay() {
    const idle = useIdle(5000, { initialState: false });
    const hasTestStarted = useAtomValue(hasTestStartedAtom);

    const [show, setShow] = useAtom(showAfkOverlayAtom);

    const open = () => setShow(true);
    const close = () => setShow(false);
    const toggle = () => setShow(prev => !prev);

    useEffect(() => {
        if (idle && !hasTestStarted) open();
        if (hasTestStarted) close();
    }, [idle, hasTestStarted]);

    return {
        show,
        open,
        close,
        toggle,
    };
}

export default usePromptOverlay;
