import useResetTest from '../hooks/useResetTest';
import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { resetBtnRefAtom } from '../atoms/typing';
import { Button } from './ui/button';
import { Repeat2 } from 'lucide-react';

function RetryButton() {
    const { newTest } = useResetTest();
    const resetBtn = useRef<HTMLButtonElement | null>(null);
    const setResetBtnRef = useSetAtom(resetBtnRefAtom);

    useEffect(() => {
        setResetBtnRef(resetBtn);
    }, [resetBtn, setResetBtnRef]);

    return (
        <Button
            ref={resetBtn}
            className='restart size-9 text-sub'
            onClick={newTest}
            variant='ghost'
            size={"icon"}
        >
            <Repeat2 strokeWidth={3} className='!size-6' />
        </Button>
    );
}

export default RetryButton;
