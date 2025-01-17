import ConfigChip from './common/ConfigChip';
import { At, Hash } from 'tabler-icons-react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
    handleToggleNumbers,
    handleTogglePunctuation,
    handleTestSize,
    testConfigurationAtom,
    createNewTestAtom,
} from '../atoms/test_configuration';
import { hasTestStartedAtom } from '../atoms/typing';
import { useEffect } from 'react';
import clsx from 'clsx';

function TestConfigBar() {
    const { punctuation, numbers, testSize } = useAtomValue(
        testConfigurationAtom,
    );

    const toggleNumbers = useSetAtom(handleToggleNumbers);
    const togglePunctuation = useSetAtom(handleTogglePunctuation);
    const setTestSize = useSetAtom(handleTestSize);
    const hasTestStarted = useAtomValue(hasTestStartedAtom);
    const sizes = [10, 25, 50, 100];

    const createNewTest = useSetAtom(createNewTestAtom);

    useEffect(() => {
        createNewTest();
    }, [createNewTest]);

    return (
        <div
            className={clsx(
                'inline-flex mx-auto items-center bg-sub-alt md:gap-2 rounded-md',
                hasTestStarted ? 'collapse' : 'visible',
            )}
        >
            <div className='flex justify-center'>
                <ConfigChip checked={punctuation} onClick={togglePunctuation}>
                    <At size={14} strokeWidth={2} /> punctuation
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
        </div>
    );
}

export default TestConfigBar;
