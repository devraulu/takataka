import React from 'react';
import { useAtomValue } from 'jotai';
import { testConfigurationAtom } from '#root/atoms/test_configuration';
import { AtSign, Hash } from 'lucide-react';

function TestType() {
    const { numbers, punctuation, testSize } = useAtomValue(
        testConfigurationAtom,
    );
    return (
        <div className='flex gap-2 items-center'>
            <div
                className='font-bold text-3xl text-main font-display tracking-tight'
                id='test-type-size'
            >
                {testSize}
            </div>
            {punctuation && (
                <AtSign
                    className='size-6 text-main'
                    strokeWidth={3}
                    id='test-type-punctuation'
                />
            )}
            {numbers && (
                <Hash
                    className='size-6 text-main'
                    strokeWidth={3}
                    id='test-type-numbers'
                />
            )}
        </div>
    );
}

export default TestType;
