import { FunctionComponent } from 'react';
import { Button, ButtonProps } from '../ui/button';
import clsx from 'clsx';

interface ConfigChipProps extends ButtonProps {
    children: string | string[] | React.ReactNode;
    checked: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ConfigChip: FunctionComponent<ConfigChipProps> = ({
    checked,
    children,
    onClick,
    className,
    ...rest
}) => {
    return (
        <Button
            variant='ghost'
            className={clsx(
                'font-bold',
                checked ? 'text-main' : 'text-sub',
                className,
            )}
            onClick={onClick}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default ConfigChip;
