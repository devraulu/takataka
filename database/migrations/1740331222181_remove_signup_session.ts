import type { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
    await db.schema.dropTable('signup_session').execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .createTable('signup_session')
        .addColumn('id', 'serial', cb => cb.primaryKey())
        .addColumn('token', 'text', cb => cb.notNull().unique())
        .addColumn('expires_at', 'timestamptz', cb => cb.notNull())
        .addColumn('username', 'text', cb => cb.notNull())
        .addColumn('email', 'text', cb => cb.notNull())
        .addColumn('password_hash', 'text', cb => cb.notNull())
        .addColumn('email_verification_code', 'text', cb => cb.notNull())
        .execute();
}
