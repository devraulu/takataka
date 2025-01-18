import { savedThemeAtom, themeAtom } from '../atoms/ui';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useAtom, useSetAtom } from 'jotai';
import themes from '@/lib/utils/themes';
import clsx from 'clsx';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check } from 'lucide-react';

interface ThemePickerProps {
    children: React.ReactNode;
}

function ThemePicker({ children }: ThemePickerProps) {
    const setTheme = useSetAtom(themeAtom);
    const [savedTheme, setSavedTheme] = useAtom(savedThemeAtom);
    const [hovered, setHovered] = useState<string | null>(null);
    const [debouncedHovered] = useDebouncedValue(hovered, 700);

    useEffect(() => {
        if (debouncedHovered) setTheme(debouncedHovered);
    }, [debouncedHovered, setTheme]);

    return (
        <Popover
            onOpenChange={isOpen => {
                if (!isOpen) setTheme(savedTheme);
            }}
        >
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
                <div className=''>
                    {themes.map(name => {
                        const displayName = name.replace(/-/g, ' ');

                        const active = hovered == name;
                        const currentlySaved = name === savedTheme;

                        return (
                            <div
                                className={clsx(
                                    'cursor-pointer flex justify-between px-4 py-1',
                                    active ? 'bg-text' : 'bg-transparent',
                                    active ? 'text-background' : 'text-sub',
                                )}
                                key={name}
                                onMouseEnter={() => setHovered(name)}
                                onClick={() => {
                                    setTheme(name);
                                    setSavedTheme(name);
                                    close();
                                    setHovered(null);
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
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemePicker;
