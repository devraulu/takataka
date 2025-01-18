import clsx from 'clsx';
import { motion } from 'motion/react';

interface CaretProps {
    top: number;
    left: number;
    fontHeight: number;
}

const Caret: React.FunctionComponent<CaretProps> = ({
    top,
    left,
    fontHeight,
}) => {
    return (
        <motion.div
            className={clsx('fixed bg-caret')}
            style={{
                width: 3,
                height: fontHeight + 4,
            }}
            animate={{
                left,
                top,
            }}
            transition={{ duration: 0.1 }}
        />
    );
};

export default Caret;
