import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { resetTestAtom, textAtom } from '#root/atoms/typing';
import { generateTestWords } from '#root/lib/utils/random-words';
import TestConfiguration, {
    TestSize,
} from '#root/lib/models/test-configuration';

const initialTestConfiguration: TestConfiguration = {
    numbers: false,
    punctuation: false,
    testSize: 10,
};

const testConfiguration = atomWithStorage(
    'test_configuration',
    initialTestConfiguration,
);

export const testConfigurationAtom = atom(get => get(testConfiguration));

export const setTestConfigurationAtom = atom(
    null,
    (_, set, update: Partial<typeof initialTestConfiguration>) => {
        set(testConfiguration, prev => ({ ...prev, ...update }));
        set(createNewTestAtom);
    },
);

export const handleTestSize = atom(null, (_, set, testSize: TestSize) =>
    set(setTestConfigurationAtom, { testSize }),
);

export const createNewTestAtom = atom(null, (get, set) => {
    const { numbers, punctuation, testSize } = get(testConfiguration);

    set(textAtom, generateTestWords(testSize ?? 10, punctuation, numbers));
    set(resetTestAtom);
});
