import { useAtomValue } from 'jotai';
import { lastTestLogsAtom } from '#root/atoms/typing';
import { calculateStats, computeWpmAndErrors } from '#root/lib/utils/results';
import SimpleTooltip from '#root/components/ui/simple-tooltip';
import { ArrowRight, Repeat2 } from 'lucide-react';
import { Button } from '#root/components/ui/button';
import TestType from '../typing/TestType';
import ResultsChart from './ResultsChart';
import StatsInfo from './StatsInfo';
import Stats from '#root/types/stats';
import useResetTest from '#root/lib/hooks/useResetTest';

function Results() {
    const lastTestLogs = useAtomValue(lastTestLogsAtom);
    const reset = useResetTest();

    const chartData = computeWpmAndErrors(lastTestLogs);

    const stats: Stats = calculateStats(chartData, lastTestLogs);

    return (
        <>
            <div className='flex justify-between items-end row-start-1 col-[content]'>
                <TestType />
                <div className='flex justify-center gap-2 mt-4'>
                    <SimpleTooltip label='Next test'>
                        <Button
                            id='next-test-button'
                            size='icon'
                            variant='ghost'
                            onClick={() => reset()}
                            className='text-main'
                            autoFocus
                            aria-label='Start new test'
                        >
                            <ArrowRight strokeWidth={3} className='size-6!' />
                        </Button>
                    </SimpleTooltip>
                    <SimpleTooltip label='Restart test'>
                        <Button
                            id='retry-test-button'
                            onClick={() => reset(false)}
                            size='icon'
                            variant='ghost'
                            className='text-main'
                            aria-label='Retry test'
                        >
                            <Repeat2 strokeWidth={3} className='size-6!' />
                        </Button>
                    </SimpleTooltip>
                </div>
            </div>

            <div className='col-[content] row-start-2 row-span-1'>
                <div className='flex grow gap-2'>
                    <SimpleTooltip label={stats.avg.toFixed(2)}>
                        <div className='flex-1'>
                            <TitleText>wpm</TitleText>
                            <ValueText>{stats.avg.toFixed(0)}</ValueText>
                        </div>
                    </SimpleTooltip>
                    <SimpleTooltip label={stats.accuracy.toFixed(2)}>
                        <div className='flex-1'>
                            <TitleText>acc</TitleText>
                            <ValueText>{stats.accuracy.toFixed(0)}%</ValueText>
                        </div>
                    </SimpleTooltip>
                </div>
                <div className='mt-6'>
                    <ResultsChart data={chartData} />
                </div>
                <div className='mt-6'>
                    <StatsInfo stats={stats} />
                </div>
            </div>
        </>
    );
}

type ResultsTextProps = {
    children: string | string[] | React.ReactNode;
};

const TitleText = ({ children }: ResultsTextProps) => (
    <div className='font-medium text-center text-sub font-display'>
        {children}
    </div>
);

const ValueText = ({ children }: ResultsTextProps) => (
    <div className='font-bold text-center font-display text-3xl leading-none text-main'>
        {children}
    </div>
);

export default Results;
