import useResetTest from '#root/hooks/useResetTest';
import { useSetAtom } from 'jotai';
import { resetBtnRefAtom } from '#root/atoms/typing';
import { Button } from '#root/components/ui/button';
import { Repeat2 } from 'lucide-react';

function RetryButton() {
    const reset = useResetTest();

    const setResetBtnRef = useSetAtom(resetBtnRefAtom);

    return (
        <Button
            id='retry-button'
            ref={ref => setResetBtnRef(ref)}
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
