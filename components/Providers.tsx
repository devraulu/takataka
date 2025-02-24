import { TooltipProvider } from './ui/tooltip';
import { Toaster } from './ui/sonner';
import { Provider } from 'jotai';
import { SWRConfig } from 'swr';
import axios from 'axios';

type Props = {
    children: React.ReactNode;
};

export default function Providers({ children }: Props) {
    return (
        <SWRConfig
            value={{
                fetcher: (resource, init) =>
                    axios(resource, init).then(res => res.data),
            }}
        >
            <Provider>
                <TooltipProvider>
                    {children}
                    <Toaster />
                </TooltipProvider>
            </Provider>
        </SWRConfig>
    );
}
