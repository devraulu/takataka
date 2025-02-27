import React from 'react';
import { useAtomValue } from 'jotai';
import { themeAtom } from '#root/atoms/ui';
import { useEffect } from 'react';

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useAtomValue(themeAtom);

    useEffect(() => {
        document.documentElement?.classList.add(theme);
        return () => {
            document.documentElement?.classList.remove(theme);
        };
    }, [theme]);

    return children;
}
