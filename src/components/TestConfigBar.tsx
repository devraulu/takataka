import { useAtomValue, useSetAtom } from 'jotai';
import {
    handleTestSize,
    testConfigurationAtom,
    setTestConfigurationAtom,
} from '@/atoms/test_configuration';
import clsx from 'clsx';
import { AtSign, Hash } from 'lucide-react';
import useIsTestActive from '@/hooks/useIsTestActive';
import { motion } from 'motion/react';
import { showAfkOverlayAtom } from '@/atoms/ui';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

function TestConfigBar() {
    const { punctuation, numbers, testSize } = useAtomValue(
        testConfigurationAtom,
    );

    const setTestConfiguration = useSetAtom(setTestConfigurationAtom);
    const setTestSize = useSetAtom(handleTestSize);

    const sizes = [10, 25, 50, 100];

    const isTestActive = useIsTestActive();

    const setShowAfkOverlay = useSetAtom(showAfkOverlayAtom);

    const variants = {
        active: {
            opacity: 1,
            translateY: 0,
        },
        inactive: {
            opacity: 0,
        },
    };

    return (
        <motion.div
            id='test-config-bar'
            initial={{ opacity: 0, translateY: 20 }}
            animate={!isTestActive ? 'active' : 'inactive'}
            variants={variants}
            className={clsx(
                'inline-flex mx-auto items-center bg-surface2 md:gap-2 rounded-md px-2 py-1.5 fullbleed',
                {
                    'pointer-events-none': isTestActive,
                },
            )}
            onClick={() => setShowAfkOverlay(false)}
        >
            <div className='flex justify-center gap-2'>
                <ToggleGroup
                    type='multiple'
                    value={[
                        punctuation ? 'punctuation' : '',
                        numbers ? 'numbers' : '',
                    ]}
                    onValueChange={value => {
                        setTestConfiguration({
                            punctuation: value.includes('punctuation'),
                            numbers: value.includes('numbers'),
                        });
                    }}
                >
                    <ToggleGroupItem
                        id='punctuation'
                        value='punctuation'
                        aria-label='Toggle punctuation'
                    >
                        <AtSign />
                        <span className='hidden md:block'>punctuation</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        id='numbers'
                        value='numbers'
                        aria-label={'Toggle numbers'}
                    >
                        <Hash />
                        <span className='hidden md:block'>numbers</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <span className='h-1 w-1 bg-main opacity-75 rounded-full mx-2'></span>
            <div className='flex justify-center gap-2'>
                <ToggleGroup
                    type='single'
                    value={testSize + ''}
                    onValueChange={value => setTestSize(parseInt(value))}
                >
                    {sizes.map(s => (
                        <ToggleGroupItem
                            key={'test-size-' + s}
                            id={'test-size-' + s}
                            aria-label={`Select test size ${s}`}
                            value={s + ''}
                        >
                            {s}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
        </motion.div>
    );
}

export default TestConfigBar;
