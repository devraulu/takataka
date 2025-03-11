import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import TestContainer from './TestContainer';
import { useSetAtom } from 'jotai';
import { createNewTestAtom } from '#root/atoms/test_configuration';
import { testInputRefAtom } from '#root/atoms/typing';
import { focusInputAndScrollIntoView } from '#root/lib/utils';

function TypingApp() {
    const createNewTest = useSetAtom(createNewTestAtom);
    const inputRef = useAtomValue(testInputRefAtom);

    useEffect(() => {
        createNewTest();
    }, []);

    if (inputRef) focusInputAndScrollIntoView(inputRef);

    return (
        <div className={'grid grid-rows-[1fr_auto] content-grid'}>
            <TestContainer />
        </div>
    );
}

export default TypingApp;
