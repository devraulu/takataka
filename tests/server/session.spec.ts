// import { db } from '#root/database/dialect';
// import { createSession } from '#root/server/session';
// import { beforeEach, describe, jest, test, expect } from '@jest/globals';
//
// const insertIntoSpy = (
//     jest.spyOn(db, 'insertInto') as jest.Mock
// ).mockReturnValue({
//     values: jest.fn().mockReturnValue({
//         returning: jest.fn().mockReturnValue({
//             executeTakeFirstOrThrow: jest.fn().mockReturnValue({
//                 id: 'session-id',
//                 user_id: 1,
//                 expires_at: new Date(),
//             }),
//         }),
//     }),
// });
//
// describe('session management', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });
//
//     test('should create a session', async () => {
//         const session = await createSession('session-token', 1);
//
//         expect(session.id).toEqual('session-id');
//         expect(session.user_id).toEqual(1);
//         expect(insertIntoSpy).toHaveBeenCalled();
//     });
// });

import { db } from '#root/database/dialect';
import { createSession } from '#root/server/lib/session';
import { beforeEach, describe, jest, test, expect } from '@jest/globals';

const insertIntoSpy = (
    jest.spyOn(db, 'insertInto') as jest.Mock
).mockReturnValue({
    values: jest.fn().mockReturnValue({
        returning: jest.fn().mockReturnValue({
            executeTakeFirstOrThrow: jest.fn().mockReturnValue({
                id: 'session-id',
                user_id: 1,
                expires_at: new Date(),
            }),
        }),
    }),
});

describe('session management', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a session', async () => {
        const session = await createSession('session-token', 1);

        expect(session.id).toEqual('session-id');
        expect(session.user_id).toEqual(1);
        expect(insertIntoSpy).toHaveBeenCalled();
    });
});
