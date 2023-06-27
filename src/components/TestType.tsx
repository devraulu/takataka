import { Group, Text, rem, useMantineTheme } from '@mantine/core';
import useTypingStore from '../stores/typing';
import { At, Hash } from 'tabler-icons-react';

interface TestTypeProps {}

const TestType: React.FunctionComponent<TestTypeProps> = () => {
  const { testSize, punctuation, numbers } = useTypingStore();
  const theme = useMantineTheme();
  return (
    <Group spacing={10}>
      <Text ff="Poppins, sans-serif" fw={700} fz={rem(28)} color="primary">
        {testSize}
      </Text>
      {punctuation && <At size={rem(24)} strokeWidth={3} color={theme.colors.primary['6']} />}
      {numbers && <Hash size={rem(24)} strokeWidth={3} color={theme.colors.primary['6']} />}
    </Group>
  );
};

export default TestType;
