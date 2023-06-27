import { Box, Text, Title, rem, useMantineTheme } from '@mantine/core';
import useTypingStore from '../stores/typing';
import { animated, useSpring } from '@react-spring/web';
import useResetTest from '../hooks/useResetTest';
import useIsTestFinished from '../hooks/useIsTestFinished';

interface LogoProps {}

const Logo: React.FunctionComponent<LogoProps> = () => {
  const hasTestStarted = useTypingStore((state) => state.hasTestStarted());
  const { newTest } = useResetTest();
  const theme = useMantineTheme();
  theme.colors[theme.primaryColor];
  const isTestFinished = useIsTestFinished();

  const { x } = useSpring({
    from: { x: 0 },
    x: hasTestStarted && !isTestFinished ? 0 : 1,
  });

  return (
    <Box
      sx={{
        userSelect: 'none',
        MozUserSelect: 'none' /* Firefox */,
        WebkitUserSelect: 'none' /* Chrome, Safari */,
        msUserSelect: 'none' /* IE 10+ */,
      }}
    >
      <animated.div style={{ opacity: x }}>
        <Text
          fz={rem(12)}
          fw={600}
          sx={{ fontFamily: 'Montserrat, sans-serif' }}
          pl="xs"
          opacity={0.6}
          color={'tertiary'}
        >
          keys go
        </Text>
      </animated.div>
      <animated.div
        style={{
          color: x.to([1, 0], [theme.colors.secondary['5'], theme.colors.tertiary['5']]),
          opacity: x.to([0, 1], [0.5, 1]),
          cursor: 'pointer',
        }}
        onClick={newTest}
      >
        <Title
          order={1}
          fz={rem(50)}
          lh={0.8}
          fw={600}
          sx={{
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          takataka
        </Title>
      </animated.div>
    </Box>
  );
};

export default Logo;
