import useResetTest from '#root/lib/hooks/useResetTest';
import { Button } from '#root/components/ui/button';
import { Repeat2 } from 'lucide-react';

function RetryButton() {
    const reset = useResetTest();

    return (
        <Button
            id='retry-button'
            className='restart size-9 text-sub'
            onClick={() => reset()}
            onKeyDown={e => e.key === 'Enter' && reset()}
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
