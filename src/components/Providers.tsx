import React from 'react';
import { TooltipProvider } from './ui/tooltip';

type Props = {
    children: React.ReactNode;
};
export default function Providers({ children }: Props) {
    return <TooltipProvider>{children}</TooltipProvider>;
}
