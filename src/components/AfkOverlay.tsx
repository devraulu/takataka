import { useMantineTheme, Text } from '@mantine/core';
import usePromptOverlay from '../hooks/usePromptOverlay';
import { motion } from 'motion/react';

interface AfkOverlayProps {
    handleTouch: () => void;
}

const AfkOverlay: React.FunctionComponent<AfkOverlayProps> = ({
    handleTouch,
}) => {
    const theme = useMantineTheme();

    const { show, close } = usePromptOverlay();

    const variants = {
        hidden: {
            opacity: 0,
            backgroundColor: theme.colors.background['6'] + '00',
        }, visible: {
            opacity: 1,
            backgroundColor:
                theme.colors.background['6'] + 'DF',
        }
    }

    return (
        <motion.div
            animate={show ? 'visible' : 'hidden'}
            variants={variants}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                zIndex: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={handleTouch}
        >
            <Text
                color='primary.6'
                fw={500}
                fz='lg'
                align='center'
                ff={'Poppins, sans-serif'}
            >
                Click here or start typing to start test...
            </Text>
        </motion.div >
    );
};

export default AfkOverlay;
