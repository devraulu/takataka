import ConfigChip from './common/ConfigChip';
import { useAtomValue, useSetAtom } from 'jotai';
import {
    handleToggleNumbers,
    handleTogglePunctuation,
    handleTestSize,
    testConfigurationAtom,
    createNewTestAtom,
} from '../atoms/test_configuration';
import { useEffect } from 'react';
import clsx from 'clsx';
import { AtSign, Hash } from 'lucide-react';
import useIsTestActive from '@/hooks/useIsTestActive';
import * as motion from 'motion/react-client';

function TestConfigBar() {
    const { punctuation, numbers, testSize } = useAtomValue(
        testConfigurationAtom,
    );

    const toggleNumbers = useSetAtom(handleToggleNumbers);
    const togglePunctuation = useSetAtom(handleTogglePunctuation);
    const setTestSize = useSetAtom(handleTestSize);
    const isTestActive = useIsTestActive();
    const sizes = [10, 25, 50, 100];

    const createNewTest = useSetAtom(createNewTestAtom);

    useEffect(() => {
        createNewTest();
    }, [createNewTest]);

    const variants = {
        active: {
            opacity: 1,
        },
        inactive: {
            opacity: 0,
        },
    };

    return (
        <motion.div
            animate={!isTestActive ? 'active' : 'inactive'}
            variants={variants}
            className={clsx(
                'inline-flex mx-auto items-center bg-sub-alt md:gap-2 rounded-md',
                {
                    'pointer-events-none': isTestActive,
                },
            )}
        >
            <div className='flex justify-center'>
                <ConfigChip checked={punctuation} onClick={togglePunctuation}>
                    <AtSign size={14} strokeWidth={2} /> punctuation
                </ConfigChip>
                <ConfigChip checked={numbers} onClick={toggleNumbers}>
                    <Hash size={14} strokeWidth={2} />
                    numbers
                </ConfigChip>
            </div>
            <div className='flex justify-center'>
                {sizes.map(s => (
                    <ConfigChip
                        key={'test-size-' + s}
                        checked={testSize == s}
                        onClick={() => setTestSize(s)}
                    >
                        {s}
                    </ConfigChip>
                ))}
            </div>
        </motion.div>
    );
}

export default TestConfigBar;
