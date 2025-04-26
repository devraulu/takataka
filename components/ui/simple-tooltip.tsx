import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

type SimpleTooltipProps = {
    children: React.ReactNode;
    label: string | React.ReactNode;
};

function SimpleTooltip({ children, label }: SimpleTooltipProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    );
}

export default SimpleTooltip;
