import './App.scss';
import { Box, MantineProvider } from '@mantine/core';
import TypingApp from './components/TypingApp';

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Box p={'md'}>
                <TypingApp />
            </Box>
        </MantineProvider>
    );
}

export default App;
