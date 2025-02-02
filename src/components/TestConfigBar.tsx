import ConfigChip from './common/ConfigChip';
import { useAtomValue, useSetAtom } from 'jotai';
import {
    handleToggleNumbers,
    handleTogglePunctuation,
    handleTestSize,
    testConfigurationAtom,
} from '@/atoms/test_configuration';
import clsx from 'clsx';
import { AtSign, Hash } from 'lucide-react';
import useIsTestActive from '@/hooks/useIsTestActive';
import { motion } from 'motion/react';
import { showAfkOverlayAtom } from '@/atoms/ui';

function TestConfigBar() {
    const { punctuation, numbers, testSize } = useAtomValue(
        testConfigurationAtom,
    );

    const toggleNumbers = useSetAtom(handleToggleNumbers);
    const togglePunctuation = useSetAtom(handleTogglePunctuation);
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
            initial={{ opacity: 0, translateY: 20 }}
            animate={!isTestActive ? 'active' : 'inactive'}
            variants={variants}
            className={clsx(
                'inline-flex mx-auto items-center bg-sub-alt md:gap-2 rounded-md px-2 py-1.5',
                {
                    'pointer-events-none': isTestActive,
                },
            )}
            onClick={() => setShowAfkOverlay(false)}
        >
            <div className='flex justify-center gap-2'>
                <ConfigChip
                    checked={punctuation}
                    onClick={() => {
                        togglePunctuation();
                    }}
                    className='text-xs md:text-sm'
                    aria-label={`Punctuation: ${punctuation ? 'on' : 'off'}`}
                >
                    <AtSign className='stroke-3 size-3' />
                    <span className='hidden md:block'>punctuation</span>
                </ConfigChip>
                <ConfigChip
                    checked={numbers}
                    onClick={toggleNumbers}
                    className='text-xs md:text-sm'
                    aria-label={`Numbers: ${numbers ? 'on' : 'off'}`}
                >
                    <Hash className='stroke-3 size-3' />
                    <span className='hidden md:block'>numbers</span>
                </ConfigChip>
            </div>
            <span className='h-1 w-1 bg-main opacity-75 rounded-full mx-2'></span>
            <div className='flex justify-center gap-2'>
                {sizes.map(s => (
                    <ConfigChip
                        key={'test-size-' + s}
                        checked={testSize == s}
                        onClick={() => setTestSize(s)}
                        className='text-xs md:text-sm'
                        aria-label={`Test size: ${s}`}
                    >
                        {s}
                    </ConfigChip>
                ))}
            </div>
        </motion.div>
    );
}

export default TestConfigBar;
