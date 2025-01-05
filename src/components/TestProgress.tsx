import { Text, rem } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { hasTestStartedAtom, textAtom, typedAtom } from '../atoms/typing';

interface TestProgressProps {}

const TestProgress: React.FunctionComponent<TestProgressProps> = () => {
    const text = useAtomValue(textAtom);
    const typed = useAtomValue(typedAtom);
    const hasTestStarted = useAtomValue(hasTestStartedAtom);

    if (!hasTestStarted) return null;

    return (
        <Text size='lg' color={'primary.4'} fw={600} fz={rem(24)}>
            {typed.length - 1}/{text.split(' ').length}
        </Text>
    );
};

export default TestProgress;
