import useIsTestActive from '@/hooks/useIsTestActive';
import clsx from 'clsx';
import { motion } from 'motion/react';

interface CaretProps {
    fontHeight: number;
    top: number;
    left: number;
}

const Caret: React.FunctionComponent<CaretProps> = ({
    top,
    left,
    fontHeight,
}) => {
    const testActive = useIsTestActive();
    return (
        <motion.div
            className={clsx('fixed bg-caret', {
                'animate-blink': !testActive,
            })}
            style={{
                width: 2.5,
                height: fontHeight - 6,
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
