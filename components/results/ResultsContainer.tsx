import React, { lazy, Suspense } from 'react';
import DisappearAnimation from '#root/components/animations/dissappear-animation';
import ResultsSkeleton from './ResultsSkeleton';
import Log from '#root/types/log';

const Results = lazy(() => import('./Results'));

export default function ResultsContainer({ logs }: { logs: Log[] }) {
    return (
        <Suspense
            fallback={
                <div className='row-start-1 col-[content]'>
                    <DisappearAnimation>
                        <ResultsSkeleton />
                    </DisappearAnimation>
                </div>
            }
        >
            <Results logs={logs} />
        </Suspense>
    );
}
