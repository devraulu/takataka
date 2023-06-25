import {
    ComposedChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Label,
    Tooltip,
    Area,
    Scatter,
    ResponsiveContainer,
} from 'recharts';
import { WpmErrorLog } from '../models/Log';
import {
    rem,
    useMantineTheme,
    Text,
    Card,
    ColorSwatch,
    Group,
} from '@mantine/core';
import { css } from '@emotion/react';

interface ResultsChartProps {
    data: WpmErrorLog[];
}

const ResultsChart: React.FunctionComponent<ResultsChartProps> = ({ data }) => {
    const theme = useMantineTheme();

    interface TooltipPayload {
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

    const CustomTooltip: React.FC<CustomTooltipProps> = ({
        active,
        payload,
        label,
    }) => {
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
                    <Group mt='sm' position='left'>
                        <ColorSwatch
                            color={theme.colors.primary['6']}
                            size={rem(10)}
                        />
                        <Text>wpm {data.avgWpm}</Text>
                    </Group>
                    <Group mt='sm' position='left'>
                        <ColorSwatch
                            color={theme.colors.red['5']}
                            size={rem(10)}
                        />
                        <Text>errors {data.errors}</Text>
                    </Group>
                </Card>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width='100%'>
            <ComposedChart
                data={data}
                css={css`
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 500;
                `}
            >
                <CartesianGrid stroke={theme.colors.tertiary['6']} />
                <XAxis dataKey='second' stroke={theme.colors.tertiary['5']} />
                <YAxis
                    yAxisId='left'
                    dataKey='rawWpm'
                    orientation='left'
                    stroke={theme.colors.tertiary['5']}
                    interval={0}
                ></YAxis>
                <YAxis
                    yAxisId='right'
                    dataKey='errors'
                    orientation='right'
                    stroke={theme.colors.tertiary['5']}
                    interval={0}
                ></YAxis>
                <Tooltip
                    trigger='hover'
                    content={props => (
                        <CustomTooltip
                            payload={props.payload as TooltipPayload[]}
                            active={!!props.active}
                            label={props.label}
                        />
                    )}
                />
                <Area
                    yAxisId='left'
                    type='monotone'
                    dataKey='avgWpm'
                    stroke={theme.colors.primary['6']}
                    fill={theme.colors.tertiary['2']}
                    name='wpm'
                />
                <Area
                    yAxisId='left'
                    type='monotone'
                    dataKey='rawWpm'
                    stroke={theme.colors.tertiary['7']}
                    fill={theme.colors.tertiary['2']}
                    name='raw'
                />
                <Scatter
                    fill='red'
                    yAxisId='right'
                    dataKey='errors'
                    name='errors'
                    shape={props => {
                        const { cx, cy, payload } = props;

                        return (
                            <circle
                                cx={cx}
                                cy={cy}
                                r={3}
                                fill={
                                    payload.errors === 0
                                        ? 'none'
                                        : theme.colors.red['5']
                                }
                            />
                        );
                    }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default ResultsChart;
