import React, { useEffect } from 'react';
import Header from '#root/components/layout/header';
import Footer from '#root/components/layout/footer';
import Providers from '#root/components/providers';
import HideOnSmallHeight from '#root/components/animations/hide-on-small-height';
import { useAtomValue } from 'jotai';
import { themeAtom } from '#root/atoms/ui';

import '#root/styles/index.css';
import '#root/styles/themes/themes.css';
import clsx from 'clsx';
import { recursiveFont } from '#root/lib/fonts';
import MetaTags from '#root/components/meta-tags';

export default function Layout({ children }: { children: React.ReactNode }) {
    const theme = useAtomValue(themeAtom);

    useEffect(() => {
        document.documentElement.classList.add(theme);
        return () => {
            document.documentElement.classList.remove(theme);
        };
    }, [theme]);

    return (
        <Providers>
            <MetaTags />
            <div
                className={clsx('wrapper antialiased', recursiveFont.className)}
                style={{ display: 'none' }}
            >
                <div className='min-h-svh transition-colors duration-150 ease-out'>
                    <div className='max-w-(--breakpoint-xl) xl:mx-auto xl:container content-grid layout-grid'>
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
                    </div>
                </div>
            </div>
        </Providers>
    );
}
