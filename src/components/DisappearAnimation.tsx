import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';

type Props = {
    children: React.ReactNode;
    show: boolean;
} & HTMLMotionProps<'div'>;

export default function DisappearAnimation({
    children,
    show,
    ...props
}: Props) {
    return (
        <AnimatePresence>
            {show ? (
                <motion.div
                    initial={{ height: 0, scale: 0 }}
                    animate={{ height: 'auto', scale: 1 }}
                    exit={{ height: 0, scale: 0 }}
                    {...props}
                >
                    {children}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
