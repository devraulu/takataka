import { useIdle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { hasTestStartedAtom } from '#root/atoms/typing';
import { showAfkOverlayAtom } from '#root/atoms/ui';

function usePromptOverlay() {
    const idle = useIdle(100 * 1000, {
        initialState: false,
        events: ['keydown', 'click'],
    });
    const hasTestStarted = useAtomValue(hasTestStartedAtom);

    const [show, setShow] = useAtom(showAfkOverlayAtom);

    const open = () => setShow(true);
    const close = () => setShow(false);
    const toggle = () => setShow(prev => !prev);

    useEffect(() => {
        if (idle && !hasTestStarted) setShow(true);
        if (hasTestStarted) setShow(false);
        return () => setShow(false);
    }, [idle, hasTestStarted, setShow]);

    return {
        show,
        open,
        close,
        toggle,
    };
}

export default usePromptOverlay;
