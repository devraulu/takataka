import { ActionIcon, Box, Text, rem, Tooltip, Group, useMantineTheme } from '@mantine/core';

import useTypingStore from '../stores/typing';
import { WpmErrorLog } from '../models/Log';
import { useEffect, useState } from 'react';
import { computeWpmAndErrors, calculateStats } from '../utils/results';
import ResultsChart from './ResultsChart';
import Stats from '../models/Stats';
import StatsInfo from './StatsInfo';
import { ArrowBackUp, ChevronRight } from 'tabler-icons-react';
import useResetTest from '../hooks/useResetTest';
import TestType from './TestType';

interface ResultsProps {}

// TODO: Fix mobile view of results, handle different breakpoints

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

    const newStats: Stats = calculateStats(newChartData, testLogs);

    setStats(newStats);
  }, [lastTestLogs]);

  return (
    <Box mx="auto" mt="md" w={'100%'}>
      <Group position="apart" align="flex-end">
        <TestType />
        <Group position="center" mt="lg">
          <Tooltip label="Next test">
            <ActionIcon onClick={newTest} size="lg" autoFocus>
              <ChevronRight size={rem(300)} strokeWidth={2} color={theme.colors.tertiary['6']} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Restart test">
            <ActionIcon onClick={reset} size="lg">
              <ArrowBackUp size={rem(300)} strokeWidth={2} color={theme.colors.tertiary['6']} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      <Group grow mt="lg">
        <Tooltip label={stats.avg.toFixed(2)}>
          <Box sx={{ flex: 1 }}>
            <TitleText>wpm</TitleText>
            <ValueText>{stats.avg.toFixed(0)}</ValueText>
          </Box>
        </Tooltip>
        <Tooltip label={stats.accuracy.toFixed(2)}>
          <Box sx={{ flex: 1 }}>
            <TitleText>acc</TitleText>
            <ValueText>{stats.accuracy.toFixed(0)}%</ValueText>
          </Box>
        </Tooltip>
      </Group>
      <Box mt="md" w={'100%'} h={rem(200)}>
        <ResultsChart data={chartData} />
      </Box>
      <Box mt="md">
        <StatsInfo stats={stats} />
      </Box>
    </Box>
  );
};

type ResultsTextProps = {
  children: string | string[] | React.ReactNode;
};

const TitleText = ({ children }: ResultsTextProps) => (
  <Text fw={400} color="tertiary" align="center" ff="Poppins, sans-serif">
    {children}
  </Text>
);

const ValueText = ({ children }: ResultsTextProps) => (
  <Text fz={rem(45)} fw={600} lh={1} color="primary" align="center" ff="Poppins, sans-serif">
    {children}
  </Text>
);

export default Results;
