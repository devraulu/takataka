import { Text, rem } from '@mantine/core';
import useTypingStore from '../stores/typing';

interface TestProgressProps {}

const TestProgress: React.FunctionComponent<TestProgressProps> = () => {
  const { text, typed } = useTypingStore(({ text, typed }) => ({
    text,
    typed,
  }));

  return (
    <Text size="lg" color={'primary.4'} fw={600} fz={rem(24)}>
      {typed.length - 1}/{text.split(' ').length}
    </Text>
  );
};

export default TestProgress;
