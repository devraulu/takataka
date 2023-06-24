import './App.scss';
import { Box, MantineProvider } from '@mantine/core';
import TypingApp from './components/TypingApp';
import Header from './components/Header';
import useUIStore from './stores/ui';
import themes, { getShades, logColor, themesArr } from './utils/themes';
import ThemeSwatch from './models/Theme';
import MantineGlobal from './components/Global';

function App() {
    const swatch = useUIStore(state => state.theme);
    const themeSwatch: ThemeSwatch = {
        primary: getShades(swatch.primary),
        secondary: getShades(swatch.secondary),
        tertiary: getShades(swatch.tertiary),
        background: getShades(swatch.background),
    };
    // themes.forEach(({ primary, secondary, tertiary, background, name }) =>

    const { primary, secondary, tertiary, background, name } = swatch;
    console.log(
        `${name}: %c ${primary} %c ${secondary} %c  ${tertiary} %c  ${background}`,
        `color: ${primary}`,
        `color: ${secondary}`,
        `color: ${tertiary}`,
        `color: ${background}`
    );
    // );
    // themesArr.forEach(arr =>
    //     arr.forEach((elem, i) => {
    //         if (i > 3) return;
    //         let shades = getShades(elem);
    //         shades.forEach(logColor);
    //     })
    // );

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colors: { ...themeSwatch },
                primaryColor: 'primary',
            }}
        >
            <MantineGlobal />
            <Box py='lg' px='md'>
                <Header />
                <Box p={'md'} mt='md'>
                    <TypingApp />
                </Box>
            </Box>
        </MantineProvider>
    );
}

export default App;
