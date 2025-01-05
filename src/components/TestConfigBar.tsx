import { Group, MediaQuery, Space, rem } from '@mantine/core';
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

interface TestConfigBarProps {}

const TestConfigBar: React.FunctionComponent<TestConfigBarProps> = () => {
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
    }, []);

    return (
        <Group
            position='center'
            sx={{
                visibility: hasTestStarted ? 'hidden' : 'initial',
            }}
        >
            <Group position='center'>
                <ConfigChip
                    checked={punctuation}
                    onClick={() => {
                        togglePunctuation();
                        console.log('punctuation', punctuation);
                    }}
                    leftIcon={<At size={14} strokeWidth={2} />}
                >
                    punctuation
                </ConfigChip>
                <ConfigChip
                    checked={numbers}
                    onClick={() => toggleNumbers()}
                    leftIcon={<Hash size={14} strokeWidth={2} />}
                >
                    numbers
                </ConfigChip>
            </Group>
            <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
                <Space w='xl' />
            </MediaQuery>
            <Group position='center'>
                {sizes.map(s => (
                    <ConfigChip
                        checked={testSize == s}
                        onClick={() => setTestSize(s)}
                    >
                        {s}
                    </ConfigChip>
                ))}
            </Group>
        </Group>
    );
};

export default TestConfigBar;
