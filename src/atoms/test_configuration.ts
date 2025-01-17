import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { textAtom } from './typing';
import { generateTestWords } from '@/lib/utils/random-words';

const initialTestConfiguration = {
    numbers: false,
    punctuation: false,
    testSize: 25,
};

const testConfiguration = atomWithStorage(
    'test_configuration',
    initialTestConfiguration,
);

export const testConfigurationAtom = atom(get => get(testConfiguration));

const setTestConfiguration = atom(
    null,
    (_, set, update: Partial<typeof initialTestConfiguration>) => {
        set(testConfiguration, prev => ({ ...prev, ...update }));
        set(createNewTestAtom);
    },
);

export const handleToggleNumbers = atom(null, (get, set) =>
    set(setTestConfiguration, { numbers: !get(testConfiguration).numbers }),
);

export const handleTogglePunctuation = atom(null, (get, set) =>
    set(setTestConfiguration, {
        punctuation: !get(testConfiguration).punctuation,
    }),
);

export const handleTestSize = atom(null, (_, set, testSize: number) =>
    set(setTestConfiguration, { testSize }),
);

export const createNewTestAtom = atom(null, (get, set) => {
    const { numbers, punctuation, testSize } = get(testConfiguration);
    set(textAtom, generateTestWords(testSize, punctuation, numbers));
});
