import React from 'react';
import { useMantineTheme, Text } from '@mantine/core';
import { animated, useSpring } from '@react-spring/web';

interface AfkOverlayProps {
  show: boolean;
  handleTouch: () => void;
}

const AfkOverlay: React.FunctionComponent<AfkOverlayProps> = ({ show, handleTouch }) => {
  const theme = useMantineTheme();

  const { opacity } = useSpring({
    from: {
      opacity: 0,
    },
    opacity: show ? 1 : 0,
    config: {
      tension: 120,
      friction: 14,
    },
  });

  return (
    <animated.div
      style={{
        opacity,
        width: '100%',
        height: '100%',
        backgroundColor: opacity.to(
          [0.5, 1],
          [theme.colors.background['6'] + '00', theme.colors.background['6'] + 'DF']
        ),
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
      <Text color="primary.6" fw={500} fz="lg" align="center" ff={'Poppins, sans-serif'}>
        Click here or start typing to start test...
      </Text>
    </animated.div>
  );
};

export default AfkOverlay;
