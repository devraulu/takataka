import { WpmErrorLog } from '../models/Log';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from './ui/chart';
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
            color: 'oklch(var(--sub-color))',
        },
        rawWpm: {
            label: 'raw',
            color: 'oklch(var(--sub-color))',
        },
        errors: {
            label: 'errors',
            color: 'oklch(var(--error-color))',
        },
        avgWpm: {
            label: 'avg',
            color: 'oklch(var(--main_color))',
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
                    fill={'oklch(var(--sub-color) / 0.4)'}
                    stroke={'oklch(var(--sub-color))'}
                />
                <Area
                    yAxisId='left'
                    dataKey='avgWpm'
                    type={'natural'}
                    fill={'oklch(var(--main-color) / 0.2)'}
                    stroke={'oklch(var(--main-color))'}
                />
                <Scatter
                    yAxisId='right'
                    dataKey='errors'
                    fill={'oklch(var(--error-color))'}
                />
            </ComposedChart>
        </ChartContainer>
    );
};

export default ResultsChart;
