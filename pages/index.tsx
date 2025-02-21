import TypingApp from '#root/components/typing/TypingApp';
import clsx from 'clsx';
import { recursiveFont } from '#root/lib/fonts';

export default function Home() {
    return (
        <main className={clsx(recursiveFont.variable)}>
            <TypingApp />
        </main>
    );
}
