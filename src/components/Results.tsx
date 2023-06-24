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
} from '@mantine/core';
import {
    ArrowUturnLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/solid';
import useTyping from '../hooks/useTyping';

import useTypingStore from '../stores/typing';
import { WpmErrorLog } from '../models/Log';
import { forwardRef, useEffect, useState } from 'react';
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

interface ResultsProps {}

const Results: React.FunctionComponent<ResultsProps> = () => {
    const { newTest, reset } = useTyping();
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
            <Flex mt='md'>
                <Stack w={'10%'} justify='space-between'>
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
            <Group position='center' mt='md'>
                <Tooltip label='Next test'>
                    <ActionIcon onClick={newTest}>
                        <ChevronRightIcon height={20} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label='Restart test'>
                    <ActionIcon
                        // className='restart'
                        onClick={reset}
                        size={'sm'}
                    >
                        <ArrowUturnLeftIcon height={20} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Box>
    );
};

type ResultsTextProps = {
    children: string | string[] | React.ReactNode;
};

const TitleText = forwardRef<HTMLDivElement, ResultsTextProps>(
    ({ children }, ref) => (
        <Text ref={ref} size='xl' align='center'>
            {children}
        </Text>
    )
);

const ValueText = forwardRef<HTMLDivElement, ResultsTextProps>(
    ({ children }, ref) => (
        <Text ref={ref} fz={rem(32)} fw='bold' align='center'>
            {children}
        </Text>
    )
);

export default Results;
