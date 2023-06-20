import { Group, Stack, Box, rem, Text, Tooltip } from '@mantine/core';
import Stats from '../models/Stats';

interface StatsInfoProps {
    stats: Stats;
}

const StatsInfo: React.FunctionComponent<StatsInfoProps> = ({
    stats: { time, raw, correct, incorrect, extra, consistency, avg },
}) => {
    return (
        <Group position='apart'>
            <Stack justify='flex-start' spacing={0}>
                <TitleText2>test type</TitleText2>
                <Text>english 10</Text>
            </Stack>
            <Tooltip label={raw.toFixed(2)}>
                <Box>
                    <TitleText2>raw</TitleText2>
                    <ValueText2>{raw.toFixed(0)}</ValueText2>
                </Box>
            </Tooltip>
            <Tooltip label='correct, incorrect, extra'>
                <Box>
                    <TitleText2>characters</TitleText2>
                    <ValueText2>
                        {correct}/{incorrect}/{extra}
                    </ValueText2>
                </Box>
            </Tooltip>
            <Tooltip label={consistency.toFixed(2)}>
                <Box>
                    <TitleText2>consistency</TitleText2>
                    <ValueText2>{consistency.toFixed(0)}</ValueText2>
                </Box>
            </Tooltip>
            <Tooltip label={time.toFixed(1)}>
                <Box>
                    <TitleText2>time</TitleText2>
                    <ValueText2>{time.toFixed(0)}</ValueText2>
                </Box>
            </Tooltip>
        </Group>
    );
};

type StatsTextProps = {
    children: string | string[] | React.ReactNode;
};

const TitleText2 = ({ children }: StatsTextProps) => (
    <Text align='center'>{children}</Text>
);

const ValueText2 = ({ children }: StatsTextProps) => (
    <Text align='center' fz={rem(24)}>
        {children}
    </Text>
);

export default StatsInfo;
