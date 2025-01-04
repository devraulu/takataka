import './App.scss';
import { MantineProvider, Space, Stack } from '@mantine/core';
import TypingApp from './components/TypingApp';
import Header from './components/Header';
import { getShades } from './utils/themes';
import ThemeSwatch from './models/Theme';
import MantineGlobal from './components/Global';
import { Notifications } from '@mantine/notifications';
import Footer from './components/Footer';
import { useAtomValue } from 'jotai';
import { themeAtom } from './stores/ui';

function App() {
    const swatch = useAtomValue(themeAtom);

    const themeSwatch: ThemeSwatch = {
        primary: getShades(swatch.primary),
        secondary: getShades(swatch.secondary),
        tertiary: getShades(swatch.tertiary),
        background: getShades(swatch.background),
    };
    const { primary, secondary, tertiary, background, name } = swatch;

    console.log(
        `${name}: %c ${primary} %c ${secondary} %c  ${tertiary} %c  ${background}`,
        `color: ${primary}`,
        `color: ${secondary}`,
        `color: ${tertiary}`,
        `color: ${background}`,
    );

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colors: { ...themeSwatch },
                primaryColor: 'primary',
            }}
        >
            <Notifications />
            <MantineGlobal />
            <Stack
                px='md'
                pt='xl'
                h={'100vh'}
                justify='space-between'
                spacing='sm'
            >
                <Header />
                <Space className='separator' />
                <TypingApp />
                <Footer />
            </Stack>
        </MantineProvider>
    );
}

export default App;
