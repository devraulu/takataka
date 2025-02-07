import React, { lazy, Suspense } from 'react';
import DisappearAnimation from '#root/components/animations/DisappearAnimation';
import ResultsSkeleton from './ResultsSkeleton';

const Results = lazy(() => import('./Results'));

export default function ResultsContainer() {
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
            <Results />
        </Suspense>
    );
}
