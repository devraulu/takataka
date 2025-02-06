import useResetTest from '../hooks/useResetTest';
import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { resetBtnRefAtom } from '../atoms/typing';
import { Button } from './ui/button';
import { Repeat2 } from 'lucide-react';

function RetryButton() {
    const reset = useResetTest();
    const resetBtn = useRef<HTMLButtonElement | null>(null);
    const setResetBtnRef = useSetAtom(resetBtnRefAtom);

    useEffect(() => {
        setResetBtnRef(resetBtn);
    }, [resetBtn, setResetBtnRef]);

    return (
        <Button
            id='retry-button'
            ref={resetBtn}
            className='restart size-9 text-sub'
            onClick={() => reset()}
            variant='ghost'
            size={'icon'}
            tabIndex={2}
            aria-label='Restart test'
        >
            <Repeat2 strokeWidth={3} className='size-6!' />
        </Button>
    );
}

export default RetryButton;
