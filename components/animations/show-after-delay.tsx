import { motion, AnimatePresence, MotionProps } from 'motion/react';
import { useEffect, useState } from 'react';

type Props = {
    delay?: number;
    children: React.ReactNode;
} & MotionProps;

export default function ShowAfterDelay({
    delay = 300,
    children,
    ...props
}: Props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShow(true), delay);

        return () => clearTimeout(timeout);
    }, [delay]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{
                        opacity: 0,
                        translateY: 20,
                    }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    {...props}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
