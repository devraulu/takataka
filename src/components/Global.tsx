import { Global, rem } from '@mantine/core';

type MantineGlobalProps = unknown;

const MantineGlobal: React.FunctionComponent<MantineGlobalProps> = () => {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        body: {
          ...theme.fn.fontStyles(),
          backgroundColor: theme.colors.background[6],
          color: theme.colors.secondary[6],
        },
        '.separator': {
          height: theme.spacing.xl,
          [theme.fn.largerThan('md')]: {
            height: rem(150),
          },
        },
      })}
    />
  );
};

export default MantineGlobal;
