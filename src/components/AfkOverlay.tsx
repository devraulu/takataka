import usePromptOverlay from '../hooks/usePromptOverlay';
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
            backgroundColor: 'rgb(var(--bg-color))',
        },
        visible: {
            opacity: 1,
            backgroundColor: 'rgb(var(--bg-color) / 0.8)',
        },
    };

    return (
        <motion.div
            animate={show ? 'visible' : 'hidden'}
            variants={variants}
            className='absolute top-0 right-0 left-0 bottom-0 z-50 flex justify-center'
            onClick={handleTouch}
            style={{
                position: 'absolute',
                inset: 0,
                height: '200%',
                backdropFilter: 'blur(3px)',
                maskImage:
                    'linear-gradient(           \
                        to bottom,              \
                        black 0% 50%,           \
                        transparent 50% 100%    \
                     )',
            }}
        >
            <div className='text-xl font-semibold text-center text-main font-display mt-6'>
                Click here or start typing to start test...
            </div>
        </motion.div>
    );
};

export default AfkOverlay;
