import React from 'react';
import { TooltipProvider } from './ui/tooltip';
import { Toaster } from './ui/sonner';

type Props = {
    children: React.ReactNode;
};
export default function Providers({ children }: Props) {
    return (
        <TooltipProvider>
            {children}
            <Toaster />
        </TooltipProvider>
    );
}
