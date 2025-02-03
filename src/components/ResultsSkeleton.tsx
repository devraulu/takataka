export default function ResultsSkeleton() {
    return (
        <div className='animate-pulse '>
            <div className='flex justify-between items-end'>
                <div className='w-14 h-12 rounded-lg bg-sub-alt' />

                <div className='flex justify-center gap-2 mt-4'>
                    <div className='w-12 h-12 rounded-lg bg-sub-alt' />
                    <div className='w-12 h-12 rounded-lg bg-sub-alt' />
                </div>
            </div>

            <div className='row-start-2 row-span-1 mt-6'>
                <div className='flex flex-grow gap-2'>
                    <div className='flex-1 flex justify-center'>
                        <div className='w-16 h-16 rounded-lg bg-sub-alt' />
                    </div>
                    <div className='flex-1 flex justify-center'>
                        <div className='w-16 h-16 rounded-lg bg-sub-alt' />
                    </div>
                </div>
            </div>
            <div className='mt-6 bg-sub-alt w-11/12 h-[200px] mx-auto rounded-lg' />
            <div className='mt-6 grid grid-cols-12 gap-4 place-content-center'>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className='col-span-6 md:col-span-3'>
                        <div className='w-20 h-20 mx-auto bg-sub-alt rounded-lg' />
                    </div>
                ))}
            </div>
        </div>
    );
}
