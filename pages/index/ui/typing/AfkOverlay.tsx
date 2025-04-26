import React from 'react';
import { MousePointerClick } from 'lucide-react';
import usePromptOverlay from '../../../../hooks/usePromptOverlay';
import { motion } from 'motion/react';

interface AfkOverlayProps {
    handleTouch: () => void;
}

const AfkOverlay: React.FunctionComponent<AfkOverlayProps> = ({
    handleTouch,
}) => {
    const { show } = usePromptOverlay();

    const variants = {
        hidden: {
            opacity: 0,
            backgroundColor: `var(--surface1-color)`,
        },
        visible: {
            opacity: 1,
            backgroundColor: `oklch(from var(--surface1-color) l c h / 0.8)`,
        },
    };

    return (
        <motion.div
            initial='hidden'
            animate={show ? 'visible' : 'hidden'}
            variants={variants}
            className='absolute top-0 right-0 left-0 bottom-0 z-50 block'
            onClick={handleTouch}
            style={{
                position: 'absolute',
                inset: 0,
                height: '200%',
                backdropFilter: 'blur(4.5px)',
                maskImage:
                    'linear-gradient(           \
                        to bottom,              \
                        black 0% 50%,           \
                        transparent 50% 100%    \
                     )',
            }}
        >
            <div className='h-1/5 w-2'></div>
            <p className='text-lg font-semibold text-center text-text font-display flex gap-2 justify-center'>
                <MousePointerClick /> Click here or start typing to start
                test...
            </p>
        </motion.div>
    );
};

export default AfkOverlay;
