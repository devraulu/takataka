import type { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .alterTable('app_user')
        .addColumn('email_verified', 'boolean', cb => cb.defaultTo(false))
        .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .alterTable('app_user')
        .dropColumn('email_verified')
        .execute();
}
