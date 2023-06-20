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

interface ResultsChartProps {
    data: WpmErrorLog[];
}

const ResultsChart: React.FunctionComponent<ResultsChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width='100%'>
            <ComposedChart data={data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='second' />
                <YAxis
                    yAxisId='left'
                    dataKey='rawWpm'
                    orientation='left'
                    stroke='#8884d8'
                >
                    <Label
                        value='Words Per Minute'
                        angle={-90}
                        position='center'
                        offset={-100}
                    />
                </YAxis>
                <YAxis
                    yAxisId='right'
                    dataKey='errors'
                    orientation='right'
                    stroke='#82ca9d'
                >
                    <Label value='Errors' angle={90} position='center' />
                </YAxis>
                <Tooltip />
                <Area
                    yAxisId='left'
                    type='monotone'
                    dataKey='avgWpm'
                    stroke='#8884d8'
                    name='wpm'
                />
                <Area
                    yAxisId='left'
                    type='monotone'
                    dataKey='rawWpm'
                    stroke='#8884d8'
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
                                fill={payload.errors === 0 ? 'none' : 'red'}
                            />
                        );
                    }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default ResultsChart;
