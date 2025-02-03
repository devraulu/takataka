import { focusInputAndScrollIntoView } from '@/lib/utils';
import { useRef } from 'react';

function useMobileTrigger() {
    const inputRef = useRef<HTMLInputElement>(null);

    const isInputFocused = () => {
        return document.activeElement === inputRef.current;
    };

    const triggerTouchKeyboard = () => {
        focusInputAndScrollIntoView(inputRef);
    };

    return { inputRef, isInputFocused, triggerTouchKeyboard };
}

export default useMobileTrigger;
