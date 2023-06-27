import { useRef } from 'react';

function useMobileTrigger() {
  const inputRef = useRef<HTMLInputElement>(null);

  const isInputFocused = () => {
    return document.activeElement === inputRef.current;
  };

  const triggerTouchKeyboard = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return { inputRef, isInputFocused, triggerTouchKeyboard };
}

export default useMobileTrigger;
