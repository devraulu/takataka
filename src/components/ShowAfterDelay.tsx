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
        setTimeout(() => setShow(true), delay);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0,
                    }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    {...props}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
