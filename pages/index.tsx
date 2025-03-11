import TypingApp from '#root/components/typing/TypingApp';
import clsx from 'clsx';
import { recursiveFont } from '#root/lib/fonts';
import { parseCookies } from 'nookies';

export function getServerSideProps(c) {
    const cookies = parseCookies(c);
    console.log({ cookies });

    return {
        props: {},
    };
}

export default function Home() {
    return (
        <main className={clsx(recursiveFont.variable)}>
            <TypingApp />
        </main>
    );
}
