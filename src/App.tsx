import { MantineProvider } from '@mantine/core';
import TypingApp from '@/components/TypingApp';
import Header from '@/components/Header';
import ThemeSwatch from '@/models/Theme';
import { Notifications } from '@mantine/notifications';
import Footer from '@/components/Footer';
import { getShades, themesMantine } from '@/lib/utils/themes';
import { useState } from 'react';
import clsx from 'clsx';
import Providers from './components/Providers';
import { useAtomValue } from 'jotai';
import { themeAtom } from './atoms/ui';

import '@/assets/themes/themes.css';
import './App.css';

function App() {
    const theme = useAtomValue(themeAtom);
    const [swatch, setSwatch] = useState(themesMantine[0]);

    if (!themesMantine.some(elem => elem.name === swatch.name)) {
        setSwatch(themesMantine[0]);
    }

    const themeSwatch: ThemeSwatch = {
        primary: getShades(swatch.primary),
        secondary: getShades(swatch.secondary),
        tertiary: getShades(swatch.tertiary),
        background: getShades(swatch.background),
    };

    return (
        <Providers>
            <div className={clsx(theme)}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colors: { ...themeSwatch },
                        primaryColor: 'primary',
                    }}
                >
                    <Notifications />
                    <div className='h-[100vh] bg-background'>
                        <div className='xl:mx-auto xl:container flex flex-col h-full'>
                            <Header />
                            <div className='mt-12'>
                                <TypingApp />
                            </div>
                            <div className='mt-auto'>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </MantineProvider>
            </div>
        </Providers>
    );
}

export default App;
