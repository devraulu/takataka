import React from 'react';

import './App.scss';
import { MantineProvider, Space, Stack } from '@mantine/core';
import TypingApp from './components/TypingApp';
import Header from './components/Header';
import useUIStore from './stores/ui';
import { getShades } from './utils/themes';
import ThemeSwatch from './models/Theme';
import MantineGlobal from './components/Global';
import { Notifications } from '@mantine/notifications';
import Footer from './components/Footer';

function App() {
  const swatch = useUIStore((state) => state.theme);
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
      <Stack px="md" pt="xl" h={'100vh'} justify="space-between" spacing="sm">
        <Header />
        <Space className="separator" />
        <TypingApp />
        <Footer />
      </Stack>
    </MantineProvider>
  );
}

export default App;
