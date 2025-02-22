import useResetTest from '#root/lib/hooks/useResetTest';
import { motion } from 'motion/react';
import useIsTestActive from '#root/lib/hooks/useIsTestActive';
import clsx from 'clsx';

function Logo() {
    const reset = useResetTest();
    const isTestActive = useIsTestActive();

    const mainTextVariants = {
        active: {
            opacity: 1,
        },
        subtle: {
            opacity: 0.9,
        },
    };

    const smallTextVariants = {
        active: {
            color: `var(--text-color)`,
            opacity: 1,
        },
        subtle: {
            color: `var(--text-color)`,
            opacity: 0,
        },
    };

    const animate = isTestActive ? 'subtle' : 'active';

    return (
        <div className='select-none' id='logo'>
            <motion.div variants={smallTextVariants} animate={animate}>
                <div className='text-xs md:text-sm text-sub font-bold font-sans pl-1 leading-none '>
                    keys go
                </div>
            </motion.div>
            <motion.div
                variants={mainTextVariants}
                animate={animate}
                style={{
                    cursor: 'pointer',
                }}
                onClick={() => reset()}
            >
                <h1
                    className={clsx(
                        'font-variation-slant text-4xl md:text-5xl font-bold tracking-tight leading-none transition-colors duration-200 text-main',
                        isTestActive && 'text-sub',
                    )}
                >
                    takataka
                </h1>
            </motion.div>
        </div>
    );
}

export default Logo;
