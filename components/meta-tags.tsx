import Head from 'next/head';
import React from 'react';

export default function MetaTags() {
    return (
        <Head>
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0'
            />

            <title>takataka</title>
            <meta name='description' content='A typing test app' />

            <link
                rel='apple-touch-icon'
                sizes='180x180'
                href='/apple-touch-icon.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='32x32'
                href='/favicon-32x32.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='16x16'
                href='/favicon-16x16.png'
            />
            <link rel='manifest' href='/site.webmanifest' />

            <meta property='og:url' content='https://takataka.rauluis.com/' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content='takataka' />
            <meta property='og:description' content='A typing test app' />
            <meta
                property='og:image'
                content='https://takataka.rauluis.com/banner.png'
            />

            <meta name='twitter:card' content='summary_large_image' />
            <meta property='twitter:domain' content='takataka.rauluis.com' />
            <meta
                property='twitter:url'
                content='https://takataka.rauluis.com/'
            />
            <meta name='twitter:title' content='takataka' />
            <meta name='twitter:description' content='A typing test app' />
            <meta
                name='twitter:image'
                content='https://takataka.rauluis.com/banner.png'
            />
        </Head>
    );
}
