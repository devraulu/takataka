import useResetTest from '../hooks/useResetTest';
import { motion } from 'motion/react';
import useIsTestActive from '@/hooks/useIsTestActive';

function Logo() {
    const { newTest } = useResetTest();
    const isTestActive = useIsTestActive();

    const mainTextVariants = {
        active: {
            color: 'oklch(var(--main-color))',
            opacity: 1,
        },
        subtle: {
            color: 'oklch(var(--sub-color))',
            opacity: 0.9,
        },
    };

    const smallTextVariants = {
        active: {
            color: 'oklch(var(--text-color))',
            opacity: 1,
        },
        subtle: {
            color: 'oklch(var(--text-color))',
            opacity: 0,
        },
    };

    const animate = isTestActive ? 'subtle' : 'active';

    return (
        <div className='select-none'>
            <motion.div variants={smallTextVariants} animate={animate}>
                <div className='text-xs md:text-sm text-sub font-bold font-sans pl-1 leading-none'>
                    keys go
                </div>
            </motion.div>
            <motion.div
                variants={mainTextVariants}
                animate={animate}
                style={{
                    cursor: 'pointer',
                }}
                onClick={newTest}
            >
                <h1 className='font-variation-slant text-4xl md:text-5xl font-bold tracking-tight leading-none'>
                    takataka
                </h1>
            </motion.div>
        </div>
    );
}

export default Logo;
