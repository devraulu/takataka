import { savedThemeAtom, themeAtom } from '../atoms/ui';
import { useEffect, useState } from 'react';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { useAtom, useSetAtom } from 'jotai';
import clsx from 'clsx';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check } from 'lucide-react';
import themes from '@/assets/themes';

interface ThemePickerProps {
    children: (open: () => void) => React.ReactNode;
}

function ThemePicker({ children }: ThemePickerProps) {
    const setTheme = useSetAtom(themeAtom);
    const [savedTheme, setSavedTheme] = useAtom(savedThemeAtom);
    const [hovered, setHovered] = useState<string | null>(null);
    const [debouncedHovered] = useDebouncedValue(hovered, 700);
    const [open, { open: show, close }] = useDisclosure();

    useEffect(() => {
        if (debouncedHovered) setTheme(debouncedHovered);
    }, [debouncedHovered, setTheme]);

    return (
        <Popover
            open={open}
            onOpenChange={isOpen => {
                if (!isOpen) {
                    setTheme(savedTheme);
                    close();
                }
                show();
            }}
        >
            <PopoverTrigger asChild>
                {children(() => {
                    show();
                })}
            </PopoverTrigger>
            <PopoverContent
                onInteractOutside={e => {
                    if (e.target === e.currentTarget) {
                        e.preventDefault();
                        setTheme(savedTheme);
                        close();
                    }
                }}
            >
                {themes.map(name => {
                    const displayName = name.replace(/-/g, ' ');

                    const active = hovered == name;
                    const currentlySaved = name === savedTheme;

                    return (
                        <div
                            className={clsx(
                                'cursor-pointer flex justify-between px-4 py-1 rounded-md',
                                active ? 'bg-text' : 'bg-transparent',
                                active ? 'text-background' : 'text-sub',
                            )}
                            key={name}
                            onMouseEnter={() => setHovered(name)}
                            onClick={() => {
                                setTheme(name);
                                setSavedTheme(name);
                                setHovered(null);
                                close();
                            }}
                        >
                            <div className='flex gap-2 items-center'>
                                <div
                                    className={clsx(
                                        'font-sans',
                                        currentlySaved
                                            ? 'font-bold'
                                            : 'font-medium',
                                    )}
                                >
                                    {displayName}
                                </div>
                                {currentlySaved && <Check size={16} />}
                            </div>
                            <div className={name}>
                                <div
                                    className={clsx(
                                        'flex border-4 border-b-8 border-background m-0 p-0',
                                    )}
                                >
                                    <div className='w-4 h-4 bg-main' />
                                    <div className='w-4 h-4 bg-sub' />
                                    <div className='w-4 h-4 bg-text' />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </PopoverContent>
        </Popover>
    );
}

export default ThemePicker;
