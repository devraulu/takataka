import useResetTest from '../hooks/useResetTest';
import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import {
    resetBtnRefAtom,
    testLostFocusAtom,
    testInputRefAtom,
} from '../atoms/typing';
import { Button } from './ui/button';
import { Repeat2 } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { focusInputAndScrollIntoView } from '@/lib/utils';

function RetryButton() {
    const { createNewTest } = useResetTest();
    const resetBtn = useRef<HTMLButtonElement | null>(null);
    const setResetBtnRef = useSetAtom(resetBtnRefAtom);

    const setTestLostFocus = useSetAtom(testLostFocusAtom);
    const testInputRef = useAtomValue(testInputRefAtom);

    useEffect(() => {
        setResetBtnRef(resetBtn);
    }, [resetBtn, setResetBtnRef]);

    return (
        <Button
            ref={resetBtn}
            className='restart size-9 text-sub'
            onClick={() => {
                createNewTest();
                if (
                    testInputRef &&
                    document.activeElement !== testInputRef?.current
                ) {
                    focusInputAndScrollIntoView(testInputRef);
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
