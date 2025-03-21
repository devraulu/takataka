import Stats from '#root/types/stats';
import SimpleTooltip from '../ui/simple-tooltip';

interface StatsInfoProps {
    stats: Stats;
}

function StatsInfo({
    stats: { time, raw, correct, incorrect, extra, consistency },
}: StatsInfoProps) {
    const data = [
        {
            tooltipLabel: raw.toFixed(2),
            title: 'raw',
            value: raw.toFixed(0),
        },
        {
            tooltipLabel: 'correct, incorrect, extra',
            title: 'characters',
            value: `${correct}/${incorrect}/${extra}`,
        },
        {
            tooltipLabel: consistency.toFixed(2),
            title: 'consistency',
            value: consistency.toFixed(0),
        },
        {
            tooltipLabel: time.toFixed(1),
            title: 'time',
            value: time.toFixed(0),
        },
    ];
    return (
        <div className='grid grid-cols-12 gap-4 place-content-center'>
            {data.map((item, index) => (
                <div key={item.title} className='col-span-6 md:col-span-3'>
                    <TooltipItem
                        key={index}
                        tooltipLabel={item.tooltipLabel}
                        title={item.title}
                        value={item.value}
                    />
                </div>
            ))}
        </div>
    );
}

type StatsTextProps = {
    children: string | string[] | React.ReactNode;
};

const TitleText = ({ children }: StatsTextProps) => (
    <div className='text-center font-medium text-sub font-display'>
        {children}
    </div>
);

const ValueText = ({ children }: StatsTextProps) => (
    <div className='text-center font-semibold text-2xl text-main leading-none font-display'>
        {children}
    </div>
);

const TooltipItem = ({
    tooltipLabel,
    title,
    value,
}: {
    tooltipLabel: React.ReactNode | string[];
    title: React.ReactNode | string[];
    value: React.ReactNode | string[];
}) => (
    <SimpleTooltip label={tooltipLabel}>
        <div>
            <TitleText>{title}</TitleText>
            <ValueText>{value}</ValueText>
        </div>
    </SimpleTooltip>
);

export default StatsInfo;
