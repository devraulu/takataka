// import {
//     ComposedChart,
//     CartesianGrid,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Area,
//     Scatter,
//     ResponsiveContainer,
// } from 'recharts';
import { Asterisk } from 'lucide-react';
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
    Cross,
    Label,
    LabelList,
    Line,
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
            color: 'rgb(var(--sub-color))',
        },
        rawWpm: {
            label: 'raw',
            color: 'rgb(var(--sub-color))',
        },
        errors: {
            label: 'errors',
            color: 'rgb(var(--error-color))',
        },
        avgWpm: {
            label: 'avg',
            color: 'rgb(var(--main_color))',
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
                    left: -20,
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
                >
                    <Label angle={-90} position={'left'}>
                        WPM
                    </Label>
                </YAxis>
                <YAxis
                    yAxisId='right'
                    dataKey='errors'
                    tickLine={false}
                    axisLine={false}
                    orientation='right'
                    allowDecimals={false}
                    allowDataOverflow
                    tickCount={8}
                >
                    <Label angle={90} position={'right'}>
                        Errors
                    </Label>
                </YAxis>
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
                    // stackId='a'
                    fill={'rgba(var(--sub-color) / 0.4)'}
                    stroke={'rgba(var(--sub-color))'}
                />
                <Area
                    yAxisId='left'
                    dataKey='avgWpm'
                    type={'natural'}
                    // stackId='a'
                    fill={'rgba(var(--main-color) / 0.2)'}
                    stroke={'rgba(var(--main-color))'}
                />
                <Scatter
                    yAxisId='right'
                    dataKey='errors'
                    fill={'rgba(var(--error-color))'}
                    // activeShape={<Asterisk className='w-3 h-3 text-error' />}
                />
            </ComposedChart>
        </ChartContainer>
    );
};

export default ResultsChart;
