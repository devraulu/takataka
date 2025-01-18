import TypingApp from '@/components/TypingApp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import clsx from 'clsx';
import Providers from './components/Providers';
import { useAtomValue } from 'jotai';
import { themeAtom } from './atoms/ui';

import '@/assets/themes/themes.css';
import './App.css';

function App() {
    const theme = useAtomValue(themeAtom);

    return (
        <Providers>
            <div className={clsx(theme)}>
                <div className='min-h-screen bg-background'>
                    <div className='max-w-screen-xl xl:mx-auto xl:container grid grid-rows-[[top-start]_auto_[content-start]_1fr_[content-end]_auto_[top-end]] min-h-screen gap-y-10 overflow-hidden content-grid'>
                        <div className='row-start-[top-start] row-end-[content-start] col-[content]'>
                            <Header />
                        </div>
                        <div className='row-start-[content-start] row-end-[content-end] [grid-column:full-width] '>
                            <TypingApp />
                        </div>
                        <div className='row-start-[content-end] row-end-[top-end] col-[content]'>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </Providers>
    );
}

export default App;
