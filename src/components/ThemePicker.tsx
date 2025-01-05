import {
    Box,
    Group,
    Popover,
    Stack,
    Text,
    rem,
    useMantineTheme,
} from '@mantine/core';
import themes from '../utils/themes';
import { savedThemeAtom, themeAtom } from '../atoms/ui';
import { useEffect, useState } from 'react';
import { SingleShadeSwatch } from '../models/Theme';
import { useDebouncedValue } from '@mantine/hooks';
import { css } from '@emotion/react';
import { useAtom, useSetAtom } from 'jotai';
import { Check } from 'tabler-icons-react';

interface ThemePickerProps {
    show: boolean;
    close: () => void;
    children: React.ReactNode;
}

const ThemePicker: React.FunctionComponent<ThemePickerProps> = ({
    show,
    close,
    children,
}) => {
    const theme = useMantineTheme();
    const setTheme = useSetAtom(themeAtom);
    const [savedTheme, setSavedTheme] = useAtom(savedThemeAtom);
    const [hovered, setHovered] = useState<SingleShadeSwatch | null>(null);
    const [debouncedHovered] = useDebouncedValue(hovered, 700);

    useEffect(() => {
        if (debouncedHovered) setTheme(debouncedHovered);
    }, [debouncedHovered]);

    return (
        <Popover
            opened={show}
            onChange={close}
            position='top'
            onClose={() => setTheme(savedTheme)}
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
                sx={{ border: `${rem(2)} solid ${theme.colors.background[7]}` }}
            >
                {themes.map((elem, i) => {
                    const { primary, secondary, tertiary, background, name } =
                        elem;
                    const active = hovered == elem;
                    const currentlySaved = elem.name === savedTheme.name;

                    return (
                        <Group
                            key={name}
                            color={'secondary.6'}
                            py={rem(8)}
                            px={rem(15)}
                            sx={{
                                backgroundColor: active
                                    ? theme.colors.tertiary[4]
                                    : 'transparent',
                                color: active
                                    ? theme.colors.background[6]
                                    : theme.colors.secondary[6],
                                cursor: 'pointer',
                            }}
                            position='apart'
                            onMouseEnter={() => setHovered(elem)}
                            onClick={() => {
                                setTheme(elem);
                                setSavedTheme(elem);
                                close();
                                setHovered(null);
                            }}
                        >
                            <Group>
                                <Text
                                    ff={'Montserrat, sans-serif'}
                                    fw={currentlySaved ? 800 : 500}
                                >
                                    {name}
                                </Text>
                                {currentlySaved && <Check size={16} />}
                            </Group>
                            <Stack
                                ml='md'
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
                                <Box bg={background} h={3} />
                            </Stack>
                        </Group>
                    );
                })}
            </Popover.Dropdown>
        </Popover>
    );
};

export default ThemePicker;
