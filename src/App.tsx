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
                    <div className='xl:mx-auto xl:container grid grid-rows-[[top-start]_auto_[content-start]_1fr_[content-end]_auto_[top-end]] min-h-screen gap-x-4'>
                        <Header />
                        <div className=''>
                            <TypingApp />
                        </div>
                        <div className='mt-auto'>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </Providers>
    );
}

export default App;
