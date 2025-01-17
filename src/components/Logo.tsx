import useResetTest from '../hooks/useResetTest';
import useIsTestFinished from '../hooks/useIsTestFinished';
import { useAtomValue } from 'jotai';
import { hasTestStartedAtom } from '../atoms/typing';
import { motion } from 'motion/react';

function Logo() {
    const hasTestStarted = useAtomValue(hasTestStartedAtom);
    const { newTest } = useResetTest();
    const isTestFinished = useIsTestFinished();

    const isInactive = hasTestStarted && !isTestFinished;

    const mainTextVariants = {
        active: {
            opacity: 1,
        },
        inactive: {
            opacity: 0.3,
        },
    };

    const smallTextVariants = {
        active: {
            color: 'rgb(var(--text-color))',
            opacity: 1,
        },
        inactive: {
            color: 'rgb(var(--text-color))',
            opacity: 0,
        },
    };

    const animate = isInactive ? 'inactive' : 'active';

    return (
        <div className='select-none'>
            <motion.div variants={smallTextVariants} animate={animate}>
                <div className='text-sm font-bold font-sans pl-1 leading-none'>keys go</div>
            </motion.div>
            <motion.div
                variants={mainTextVariants}
                animate={animate}
                style={{
                    cursor: 'pointer',
                }}
                onClick={newTest}
            >
                <h1 className='text-5xl font-bold leading-none font-display text-main'>
                    takataka
                </h1>
            </motion.div>
        </div>
    );
}

export default Logo;
