import React from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';

type Props = {
    children: React.ReactNode;
    show?: boolean;
} & HTMLMotionProps<'div'>;

export default function DisappearAnimation({
    children,
    show = true,
    ...props
}: Props) {
    return (
        <AnimatePresence>
            {show ? (
                <motion.div
                    initial={{ translateY: 30 }}
                    animate={{ height: 'auto', translateY: 0 }}
                    exit={{ height: 0, opacity: 0 }}
                    {...props}
                >
                    {children}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
