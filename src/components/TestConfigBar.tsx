import { Box, Chip, Group, MediaQuery, Space, rem } from '@mantine/core';
import useTypingStore from '../stores/typing';
import ConfigChip from './common/ConfigChip';
import { AtSymbolIcon, HashtagIcon } from '@heroicons/react/24/solid';

interface TestConfigBarProps {}

const TestConfigBar: React.FunctionComponent<TestConfigBarProps> = () => {
    const {
        punctuation,
        numbers,
        testSize,
        toggleNumbers,
        togglePunctuation,
        setTestSize,
    } = useTypingStore();
    const sizes = [10, 25, 50, 100];

    return (
        <Group position='center'>
            <Group position='center'>
                <ConfigChip
                    checked={punctuation}
                    onClick={() => {
                        togglePunctuation();
                        console.log('punctuation', punctuation);
                    }}
                    leftIcon={<AtSymbolIcon width={12} />}
                >
                    punctuation
                </ConfigChip>
                <ConfigChip
                    checked={numbers}
                    onClick={() => toggleNumbers()}
                    leftIcon={<HashtagIcon width={12} />}
                >
                    numbers
                </ConfigChip>
            </Group>
            <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
                <Space w='xl' />
            </MediaQuery>
            {/* <Chip.Group
                value={testSize + ''}
                onChange={v => setTestSize(Number(v))}
            > */}
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
            {/* </Chip.Group> */}
        </Group>
    );
};

export default TestConfigBar;
