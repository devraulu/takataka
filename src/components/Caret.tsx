import { rem, useMantineTheme } from '@mantine/core';
import { a, useSpring } from '@react-spring/web';

interface CaretProps {
  top: number;
  left: number;
}

const Caret: React.FunctionComponent<CaretProps> = ({ top, left }) => {
  const props = useSpring({
    from: { left: 0, top: 0 },
    left,
    top,
    config: {
      mass: 0.5,
      tension: 246,
      friction: 14,
    },
  });

  const theme = useMantineTheme();

  return (
    <a.div
      style={{
        background: theme.colors.primary['6'],
        width: rem(2),
        height: rem(36),
        position: 'fixed',
        ...props,
      }}
    />
  );
};

export default Caret;
