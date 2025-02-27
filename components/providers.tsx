import { TooltipProvider } from './ui/tooltip';
import { Toaster } from './ui/sonner';
import { createStore, Provider } from 'jotai';
import { SWRConfig } from 'swr';
import axios from 'axios';
import ThemeProvider from './theme-provider';

type Props = {
    children: React.ReactNode;
};

const store = createStore();

export default function Providers({ children }: Props) {
    return (
        <SWRConfig
            value={{
                fetcher: (resource, init) =>
                    axios(resource, init).then(res => res.data),
            }}
        >
            <Provider store={store}>
                <ThemeProvider>
                    <TooltipProvider>
                        {children}
                        <Toaster />
                    </TooltipProvider>
                </ThemeProvider>
            </Provider>
        </SWRConfig>
    );
}
