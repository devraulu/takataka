import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { themeAtom } from '#root/atoms/ui';
import { useEffect } from 'react';
import themes from '#root/lib/utils/themes';

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [hasRendered, setHasRendered] = useState(false);
    const theme = useAtomValue(themeAtom);

    useEffect(() => {
        if (!hasRendered) setHasRendered(true);
    }, []);

    if (!hasRendered) {
        return null;
    }

    document.documentElement.classList.remove(...themes);
    document.documentElement?.classList.add(theme);

    return children;
}
