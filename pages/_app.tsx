import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import clsx from 'clsx';
import { recursiveFont } from '#root/lib/fonts';
import { useAtomValue } from 'jotai';
import { themeAtom } from '#root/atoms/ui';

import Layout from '#root/components/layout/default-layout';
import MetaTags from '#root/components/meta-tags';
import Providers from '#root/components/Providers';

import '#root/styles/index.css';
import '#root/styles/themes/themes.css';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const theme = useAtomValue(themeAtom);

    useEffect(() => {
        document.documentElement.classList.add(theme);
        return () => {
            document.documentElement.classList.remove(theme);
        };
    }, [theme]);

    const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

    return (
        <Providers>
            <MetaTags />
            <div
                className={clsx('wrapper antialiased', recursiveFont.className)}
                style={{ display: 'none' }}
            >
                <div className='min-h-svh transition-colors duration-150 ease-out'>
                    <div className='max-w-(--breakpoint-xl) xl:mx-auto xl:container content-grid layout-grid'>
                        {getLayout(<Component {...pageProps} />)}
                    </div>
                </div>
            </div>
        </Providers>
    );
}
