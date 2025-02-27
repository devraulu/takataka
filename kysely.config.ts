import { defineConfig } from 'kysely-ctl';
import { db as kysely } from './database/dialect';

export default defineConfig({
    kysely,
    migrations: {
        migrationFolder: 'database/migrations',
    },
});
