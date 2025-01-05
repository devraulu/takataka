import { rem, useMantineTheme } from '@mantine/core';
import { motion } from 'motion/react';

interface CaretProps {
    top: number;
    left: number;
}

const Caret: React.FunctionComponent<CaretProps> = ({ top, left }) => {
    const theme = useMantineTheme();

    return (
        <motion.div
            style={{
                background: theme.colors.primary['6'],
                width: rem(2),
                height: rem(34),
                position: 'fixed',
            }}
            animate={{
                left, top,
            }}
            transition={{duration: .1}}
        />
    );
};

export default Caret;
