import TypingApp from '@/components/TypingApp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from './components/Providers';
import HideOnSmallHeight from './components/HideOnSmallHeight';

import { useAtomValue } from 'jotai';
import { themeAtom } from './atoms/ui';

import '../index.css';
import '@/assets/fonts.css';
import '@/assets/themes/themes.css';
import './App.css';

import { useEffect } from 'react';

function App() {
    const theme = useAtomValue(themeAtom);

    useEffect(() => {
        document.documentElement.classList.add(theme);

        return () => {
            document.documentElement.classList.remove(theme);
        };
    }, [theme]);

    return (
        <Providers>
            <div className={'antialiased bg-background text-text'}>
                <div className='min-h-svh transition-colors duration-150 ease-out'>
                    <div className='max-w-screen-xl xl:mx-auto xl:container content-grid layout-grid'>
                        <div className='row-start-[top-start] row-end-[content-start] col-[content]'>
                            <HideOnSmallHeight>
                                <Header />
                            </HideOnSmallHeight>
                        </div>
                        <div className='row-start-[content-start] row-end-[content-end] [grid-column:full-width]'>
                            <TypingApp />
                        </div>
                        <div className='row-start-[content-end] row-end-[top-end] col-start-[content-start] col-end-[content-end]'>
                            <HideOnSmallHeight>
                                <Footer />
                            </HideOnSmallHeight>
                        </div>
                    </div>
                </div>
            </div>
        </Providers>
    );
}

export default App;
