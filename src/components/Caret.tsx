import { rem, useMantineTheme } from '@mantine/core';
import { motion } from 'motion/react';
import { useEffect } from 'react';

interface CaretProps {
    top: number;
    left: number;
}

const Caret: React.FunctionComponent<CaretProps> = ({ top, left }) => {
    const theme = useMantineTheme();

    useEffect(() => {
        console.log('re rendered caret');
    });

    return (
        <motion.div
            animate={{ left, top }}
            style={{
                background: theme.colors.primary['6'],
                width: rem(2),
                height: rem(34),
                position: 'fixed',
            }}
        />
    );
};

export default Caret;
