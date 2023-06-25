import './App.scss';
import { Box, MantineProvider } from '@mantine/core';
import TypingApp from './components/TypingApp';
import Header from './components/Header';
import useUIStore from './stores/ui';
import { getShades } from './utils/themes';
import ThemeSwatch from './models/Theme';
import MantineGlobal from './components/Global';
import { Notifications } from '@mantine/notifications';

function App() {
    const swatch = useUIStore(state => state.theme);
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
        `color: ${background}`
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
            <Box px='md' pt='xl'>
                <Header />
                <Box p={'md'} mt='xl'>
                    <TypingApp />
                </Box>
            </Box>
        </MantineProvider>
    );
}

export default App;
