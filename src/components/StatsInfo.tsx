import { Group, Stack, Box, rem, Text, Tooltip, Grid } from '@mantine/core';
import Stats from '../models/Stats';

interface StatsInfoProps {
  stats: Stats;
}

const StatsInfo: React.FunctionComponent<StatsInfoProps> = ({
  stats: { time, raw, correct, incorrect, extra, consistency, avg },
}) => {
  return (
    <Grid>
      <Grid.Col span={6} md={3}>
        <Tooltip label={raw.toFixed(2)}>
          <Box>
            <TitleText2>raw</TitleText2>
            <ValueText2>{raw.toFixed(0)}</ValueText2>
          </Box>
        </Tooltip>
      </Grid.Col>
      <Grid.Col span={6} md={3}>
        <Tooltip label="correct, incorrect, extra">
          <Box>
            <TitleText2>characters</TitleText2>
            <ValueText2>
              {correct}/{incorrect}/{extra}
            </ValueText2>
          </Box>
        </Tooltip>
      </Grid.Col>
      <Grid.Col span={6} md={3}>
        <Tooltip label={consistency.toFixed(2)}>
          <Box>
            <TitleText2>consistency</TitleText2>
            <ValueText2>{consistency.toFixed(0)}</ValueText2>
          </Box>
        </Tooltip>
      </Grid.Col>
      <Grid.Col span={6} md={3}>
        <Tooltip label={time.toFixed(1)}>
          <Box>
            <TitleText2>time</TitleText2>
            <ValueText2>{time.toFixed(0)}</ValueText2>
          </Box>
        </Tooltip>
      </Grid.Col>
    </Grid>
  );
};

type StatsTextProps = {
  children: string | string[] | React.ReactNode;
};

const TitleText2 = ({ children }: StatsTextProps) => (
  <Text align="center" fw={500} color="tertiary" ff="Poppins, sans-serif">
    {children}
  </Text>
);

const ValueText2 = ({ children }: StatsTextProps) => (
  <Text align="center" fw={600} fz={rem(26)} color="primary" lh={1} ff="Poppins, sans-serif">
    {children}
  </Text>
);

export default StatsInfo;
