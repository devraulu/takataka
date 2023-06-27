import { Box, Group, Popover, Stack, Text, rem, useMantineTheme } from '@mantine/core';
import themes from '../utils/themes';
import useUIStore from '../stores/ui';
import { useEffect, useState } from 'react';
import { SingleShadeSwatch } from '../models/Theme';
import { useDebouncedValue } from '@mantine/hooks';
import { css } from '@emotion/react';

interface ThemePickerProps {
  show: boolean;
  close: () => void;
  children: React.ReactNode;
}

const ThemePicker: React.FunctionComponent<ThemePickerProps> = ({ show, close, children }) => {
  const theme = useMantineTheme();
  const [hovered, setHovered] = useState<SingleShadeSwatch | null>(null);
  // const [hovered, setHovered] = useDebouncedState<SingleShadeSwatch | null>(
  //     null,
  //     500
  // );
  const [debouncedHovered] = useDebouncedValue(hovered, 700);

  useEffect(() => {
    if (debouncedHovered) setTheme(debouncedHovered);
  }, [debouncedHovered]);

  const { setTheme, savedTheme, setSavedTheme } = useUIStore(
    ({ theme, savedTheme, setTheme, setSavedTheme }) => ({
      theme,
      setTheme,
      savedTheme,
      setSavedTheme,
    })
  );

  return (
    <Popover
      opened={show}
      onChange={close}
      position="top"
      onClose={() => {
        if (savedTheme) setTheme(savedTheme);
      }}
      css={css`
        .mantine-popover-arrow {
          background: blue;
        }
      `}
    >
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown
        bg={theme.colors.background[6]}
        p={0}
        sx={{ border: `${rem(5)} solid ${theme.colors.background[7]}` }}
      >
        {themes.map((elem, i) => {
          const { primary, secondary, tertiary, background, name } = elem;
          const active = hovered == elem;

          return (
            <Group
              color={'secondary.6'}
              py={rem(8)}
              px={rem(15)}
              sx={{
                backgroundColor: active ? theme.colors.tertiary[4] : 'transparent',
                color: active ? theme.colors.background[6] : theme.colors.secondary[6],
                cursor: 'pointer',
              }}
              position="apart"
              onMouseEnter={() => setHovered(elem)}
              onClick={() => {
                setTheme(elem);
                setSavedTheme(elem);
                close();
                setHovered(null);
              }}
            >
              <Text fw={500} ff={'Montserrat, sans-serif'}>
                {name}
              </Text>
              <Stack
                ml="md"
                spacing={0}
                sx={{
                  border: `1px solid ${background}`,
                }}
              >
                <Group spacing={0}>
                  <Box bg={primary} w={10} h={10} />
                  <Box bg={secondary} w={10} h={10} />
                  <Box bg={tertiary} w={10} h={10} />
                </Group>
                <Box bg={background} h={2} />
              </Stack>
            </Group>
          );
        })}
      </Popover.Dropdown>
    </Popover>
  );
};

export default ThemePicker;
