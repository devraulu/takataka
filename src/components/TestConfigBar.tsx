import { Group, MediaQuery, Space, rem } from '@mantine/core';
import useTypingStore, { configBarSelector } from '../stores/typing';
import ConfigChip from './common/ConfigChip';
import { At, Hash } from 'tabler-icons-react';

interface TestConfigBarProps {}

const TestConfigBar: React.FunctionComponent<TestConfigBarProps> = () => {
  const { punctuation, numbers, testSize, toggleNumbers, togglePunctuation, setTestSize } =
    useTypingStore(configBarSelector);

  const sizes = [10, 25, 50, 100];

  return (
    <Group position="center">
      <Group position="center">
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
        <Space w="xl" />
      </MediaQuery>
      <Group position="center">
        {sizes.map((s) => (
          <ConfigChip checked={testSize == s} onClick={() => setTestSize(s)}>
            {s}
          </ConfigChip>
        ))}
      </Group>
    </Group>
  );
};

export default TestConfigBar;
