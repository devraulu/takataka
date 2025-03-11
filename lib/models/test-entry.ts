import Log from '#root/types/log';
import TestConfiguration from './test-configuration';
import { z } from 'zod';

type TestEntry = {
    testConfiguration: TestConfiguration;
    logs: Log[];
    createdAt: Date;
    synced: boolean;
};

export const TestEntrySchema = z.object({
    testConfiguration: z.object({}),
});

export default TestEntry;
