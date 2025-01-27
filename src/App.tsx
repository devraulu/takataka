import TypingApp from '@/components/TypingApp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from './components/Providers';
import { useAtomValue } from 'jotai';
import { themeAtom } from './atoms/ui';

import '@/assets/fonts.css';
import '@/assets/themes/themes.css';
import '../index.css';
import HideOnSmallHeight from './components/HideOnSmallHeight';

function App() {
    const theme = useAtomValue(themeAtom);

    return (
        <Providers>
            <div className={theme}>
                <div className='min-h-svh bg-background transition-colors duration-150 ease-out'>
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
