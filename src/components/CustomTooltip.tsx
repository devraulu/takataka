import { Card, Group, rem, ColorSwatch, Text, useMantineTheme } from '@mantine/core';
import { WpmErrorLog } from '../models/Log';

interface CustomTooltipProps {}

export interface TooltipPayload {
  color: string;
  dataKey: string;
  name: string;
  payload: WpmErrorLog;
  value: string | number | Array<string | number>;
  fill: string;
}

interface CustomTooltipProps {
  active: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  const theme = useMantineTheme();

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    console.log('payload', data);
    return (
      <Card
        sx={{
          backgroundColor: theme.colors.background['4'],
          color: theme.colors.primary['1'],
        }}
      >
        <Text>{data.second}s</Text>
        <Group mt="sm" position="left">
          <ColorSwatch color={theme.colors.primary['6']} size={rem(10)} />
          <Text>wpm {data.avgWpm}</Text>
        </Group>
        <Group mt="sm" position="left">
          <ColorSwatch color={theme.colors.red['5']} size={rem(10)} />
          <Text>errors {data.errors}</Text>
        </Group>
      </Card>
    );
  }
  return null;
};

export default CustomTooltip;
