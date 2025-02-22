import { focusInputAndScrollIntoView } from '#root/lib/utils';
import { useRef } from 'react';

function useMobileTrigger() {
    const inputRef = useRef<HTMLInputElement>(null);

    const isInputFocused = () => {
        return document.activeElement === inputRef.current;
    };

    const triggerTouchKeyboard = () => {
        focusInputAndScrollIntoView(inputRef.current);
    };

    return { inputRef, isInputFocused, triggerTouchKeyboard };
}

export default useMobileTrigger;
