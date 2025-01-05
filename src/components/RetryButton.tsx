import { ActionIcon, rem, useMantineTheme } from '@mantine/core';
import { ArrowBackUp } from 'tabler-icons-react';
import useResetTest from '../hooks/useResetTest';
import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { resetBtnRefAtom } from '../atoms/typing';

interface RetryButtonProps {}

const RetryButton: React.FunctionComponent<RetryButtonProps> = () => {
    const { newTest } = useResetTest();
    const resetBtn = useRef<HTMLButtonElement | null>(null);
    const setResetBtnRef = useSetAtom(resetBtnRefAtom);

    useEffect(() => {
        setResetBtnRef(resetBtn);
    }, [resetBtn]);

    const theme = useMantineTheme();

    return (
        <ActionIcon
            ref={resetBtn}
            className='restart'
            onClick={newTest}
            size='lg'
        >
            <ArrowBackUp
                size={rem(350)}
                strokeWidth={2}
                color={theme.colors.tertiary['5']}
            />
        </ActionIcon>
    );
};

export default RetryButton;
