import React from 'react';
import { WpmErrorLog } from '#root/models/Log';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '#root/components/ui/chart';
import {
    Area,
    CartesianGrid,
    ComposedChart,
    Scatter,
    XAxis,
    YAxis,
} from 'recharts';

interface ResultsChartProps {
    data: WpmErrorLog[];
}

const ResultsChart: React.FunctionComponent<ResultsChartProps> = ({ data }) => {
    const chartConfig = {
        second: {
            label: 'second',
            color: 'var(--sub-color)',
        },
        rawWpm: {
            label: 'raw',
            color: 'var(--sub-color)',
        },
        errors: {
            label: 'errors',
            color: 'var(--error-color)',
        },
        avgWpm: {
            label: 'avg',
            color: 'var(--main_color)',
        },
    } satisfies ChartConfig;

    return (
        <ChartContainer
            config={chartConfig}
            className='min-h-[100px] h-[200px] w-full'
        >
            <ComposedChart
                data={data.map(log => ({
                    ...log,
                    errors: log.errors > 0 ? log.errors : undefined,
                }))}
                accessibilityLayer
                margin={{
                    left: 0,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} strokeOpacity={0.35} />
                <XAxis
                    dataKey='second'
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <YAxis
                    yAxisId='left'
                    dataKey='rawWpm'
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickCount={8}
                    allowDataOverflow
                    domain={[0, 'dataMax + 10']}
                />
                <YAxis
                    yAxisId='right'
                    dataKey='errors'
                    tickLine={false}
                    axisLine={false}
                    orientation='right'
                    allowDecimals={false}
                    allowDataOverflow
                    tickCount={8}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            indicator='dot'
                            labelKey='seconds'
                            labelClassName='text-text'
                        />
                    }
                    cursor={false}
                />
                <Area
                    yAxisId='left'
                    dataKey='rawWpm'
                    type={'natural'}
                    fill={'oklch(from var(--sub-color) l c h / 0.4)'}
                    stroke={'var(--sub-color)'}
                />
                <Area
                    yAxisId='left'
                    dataKey='avgWpm'
                    type={'natural'}
                    fill={'oklch(from var(--main-color) l c h / 0.2)'}
                    stroke={'var(--main-color)'}
                />
                <Scatter
                    yAxisId='right'
                    dataKey='errors'
                    fill={'var(--error-color)'}
                />
            </ComposedChart>
        </ChartContainer>
    );
};

export default ResultsChart;
