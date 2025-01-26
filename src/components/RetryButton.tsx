import useResetTest from '../hooks/useResetTest';
import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import {
    resetBtnRefAtom,
    testLostFocusAtom,
    wordsContainerRefAtom,
} from '../atoms/typing';
import { Button } from './ui/button';
import { Repeat2 } from 'lucide-react';
import { useAtomValue } from 'jotai';

function RetryButton() {
    const { newTest } = useResetTest();
    const resetBtn = useRef<HTMLButtonElement | null>(null);
    const setResetBtnRef = useSetAtom(resetBtnRefAtom);

    const setTestLostFocus = useSetAtom(testLostFocusAtom);
    const wordsContainerRef = useAtomValue(wordsContainerRefAtom);

    useEffect(() => {
        setResetBtnRef(resetBtn);
    }, [resetBtn, setResetBtnRef]);

    return (
        <Button
            ref={resetBtn}
            className='restart size-9 text-sub'
            onClick={() => {
                newTest();
                if (document.activeElement !== wordsContainerRef?.current) {
                    wordsContainerRef?.current?.focus();
                    setTestLostFocus(false);
                }
            }}
            variant='ghost'
            size={'icon'}
            tabIndex={2}
            aria-label='Restart test'
        >
            <Repeat2 strokeWidth={3} className='!size-6' />
        </Button>
    );
}

export default RetryButton;
