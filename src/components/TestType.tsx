import { Group, Text, rem, useMantineTheme } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { At, Hash } from 'tabler-icons-react';
import { testConfigurationAtom } from '../atoms/test_configuration';

interface TestTypeProps {}

const TestType: React.FunctionComponent<TestTypeProps> = () => {
    const { numbers, punctuation, testSize } = useAtomValue(
        testConfigurationAtom,
    );
    const theme = useMantineTheme();
    return (
        <Group spacing={10}>
            <Text
                ff='Poppins, sans-serif'
                fw={700}
                fz={rem(28)}
                color='primary'
            >
                {testSize}
            </Text>
            {punctuation && (
                <At
                    size={rem(24)}
                    strokeWidth={3}
                    color={theme.colors.primary['6']}
                />
            )}
            {numbers && (
                <Hash
                    size={rem(24)}
                    strokeWidth={3}
                    color={theme.colors.primary['6']}
                />
            )}
        </Group>
    );
};

export default TestType;
