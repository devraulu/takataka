import { Button, ButtonProps } from '@mantine/core';
import { FunctionComponent } from 'react';

interface ConfigChipProps extends ButtonProps {
    children: string | string[] | React.ReactNode;
    checked: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ConfigChip: FunctionComponent<ConfigChipProps> = ({
    checked,
    children,
    onClick,
    ...rest
}) => {
    return (
        <Button
            variant='subtle'
            compact
            color={checked ? 'primary' : 'tertiary.6'}
            {...rest}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default ConfigChip;
