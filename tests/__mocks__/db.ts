import { jest } from 'bun:test';

export const db = {
    insertInto: () => jest.fn(),
    deleteFrom: () => jest.fn(),
    updateTable: () => jest.fn(),
    selectFrom: () => jest.fn(),
};
