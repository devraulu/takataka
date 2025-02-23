import HideOnSmallHeight from '#root/components/animations/hide-on-small-height';

import Header from '#root/components/layout/Header';
import Footer from '#root/components/layout/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className='row-start-[top-start] row-end-[content-start] col-[content]'>
                <HideOnSmallHeight>
                    <Header />
                </HideOnSmallHeight>
            </div>
            <div className='row-start-[content-start] row-end-[content-end] fullbleed'>
                {children}
            </div>
            <div className='row-start-[content-end] row-end-[top-end] col-start-[content-start] col-end-[content-end]'>
                <HideOnSmallHeight>
                    <Footer />
                </HideOnSmallHeight>
            </div>
        </>
    );
}
