import { lastTestResultsAtom } from '#root/atoms/typing';
import Results from '#root/components/results/Results';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function ResultsPage() {
    const router = useRouter();

    const {
        query: { id },
    } = router;

    const lastResult = useAtomValue(lastTestResultsAtom);
    const { data } = useSWR(id == 'last' ? null : `/api/results/${id}`, {
        fallbackData: lastResult,
    });

    console.log({ data });
    // if (id === 'last') return;

    return <Results logs={data?.logs} />;
}
