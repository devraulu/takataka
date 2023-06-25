import { Overlay, useMantineTheme, Text } from '@mantine/core';

interface AfkOverlayProps {
    handleTouch: () => void;
}

const AfkOverlay: React.FunctionComponent<AfkOverlayProps> = ({
    handleTouch,
}) => {
    const theme = useMantineTheme();

    return (
        <Overlay
            blur={10}
            center
            onClick={handleTouch}
            radius='md'
            color={theme.colors.background['5']}
        >
            <Text
                color='primary.5'
                fw={500}
                fz='lg'
                align='center'
                ff={'Poppins, sans-serif'}
            >
                Click here or start typing to start test...
            </Text>
        </Overlay>
    );
};

export default AfkOverlay;
