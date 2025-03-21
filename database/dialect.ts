import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import Database from './types';
import pg from 'pg';

const dialect = new PostgresDialect({
    pool: new pg.Pool({ connectionString: process.env.DB_URL }),
});

export const db = new Kysely<Database>({
    dialect,
    plugins: [new CamelCasePlugin()],
});
