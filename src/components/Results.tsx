import {
    ActionIcon,
    Box,
    Flex,
    Title,
    Text,
    Stack,
    rem,
    Tooltip,
    Group,
    useMantineTheme,
} from '@mantine/core';

import useTypingStore from '../stores/typing';
import { WpmErrorLog } from '../models/Log';
import { useEffect, useState } from 'react';
import {
    computeWpmAndErrors,
    calculateAccuracy,
    calculateRawWpm,
    calculateAvgWpm,
    calculateConsistency,
} from '../utils/results';
import ResultsChart from './ResultsChart';
import Stats from '../models/Stats';
import StatsInfo from './StatsInfo';
import { ArrowBackUp, ChevronRight } from 'tabler-icons-react';
import useResetTest from '../hooks/useResetTest';

interface ResultsProps {}

const Results: React.FunctionComponent<ResultsProps> = () => {
    const { lastTestLogs } = useTypingStore();
    const [chartData, setChartData] = useState<WpmErrorLog[]>([]);
    const [stats, setStats] = useState<Stats>({
        accuracy: 0,
        raw: 0,
        avg: 0,
        consistency: 0,
        time: 0,
        correct: 0,
        incorrect: 0,
        extra: 0,
    });

    const { reset, newTest } = useResetTest();

    const theme = useMantineTheme();

    useEffect(() => {
        const testLogs = [...lastTestLogs];
        const newChartData = computeWpmAndErrors(testLogs);
        setChartData(newChartData);

        const firstSecond = testLogs[0]?.timestamp / 1000;
        const lastSecond = testLogs[testLogs.length - 1]?.timestamp / 1000;

        const newStats: Stats = {
            accuracy: calculateAccuracy(testLogs),
            raw: calculateRawWpm(newChartData),
            avg: calculateAvgWpm(newChartData),
            consistency: calculateConsistency(newChartData),
            time: lastSecond - firstSecond,
            correct: testLogs.filter(l => !l.error && !l.extra).length,
            incorrect: testLogs.filter(l => l.error).length,
            extra: testLogs.filter(l => l.extra).length,
        };
        setStats(newStats);
    }, [lastTestLogs]);

    return (
        <Box>
            <Title order={2}>Results</Title>
            <Flex mt='md' gap='md'>
                <Stack w={'10%'}>
                    <Tooltip label={stats.avg.toFixed(2)}>
                        <Box>
                            <TitleText>wpm</TitleText>
                            <ValueText>{stats.avg.toFixed(0)}</ValueText>
                        </Box>
                    </Tooltip>

                    <Tooltip label={stats.accuracy.toFixed(2)}>
                        <Box>
                            <TitleText>acc</TitleText>
                            <ValueText>{stats.accuracy.toFixed(0)}%</ValueText>
                        </Box>
                    </Tooltip>
                </Stack>
                <Box w={'90%'}>
                    <ResultsChart data={chartData} />
                </Box>
            </Flex>
            <StatsInfo stats={stats} />
            <Group position='center' mt='lg'>
                <Tooltip label='Next test'>
                    <ActionIcon onClick={newTest} size='lg'>
                        <ChevronRight
                            size={rem(300)}
                            strokeWidth={2}
                            color={theme.colors.tertiary['5']}
                        />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label='Restart test'>
                    <ActionIcon
                        // className='restart'
                        onClick={reset}
                        size='lg'
                    >
                        <ArrowBackUp
                            size={rem(300)}
                            strokeWidth={2}
                            color={theme.colors.tertiary['5']}
                        />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Box>
    );
};

type ResultsTextProps = {
    children: string | string[] | React.ReactNode;
};

const TitleText = ({ children }: ResultsTextProps) => (
    <Text fz='xl' fw={700} color='tertiary'>
        {children}
    </Text>
);

const ValueText = ({ children }: ResultsTextProps) => (
    <Text fz={rem(50)} fw={600} lh={1} color='primary'>
        {children}
    </Text>
);

export default Results;
