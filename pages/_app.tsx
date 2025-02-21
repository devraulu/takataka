import Layout from '#root/layouts/default-layout';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

    return getLayout(<Component {...pageProps} />);
}
