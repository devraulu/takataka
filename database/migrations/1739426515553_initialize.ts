import { type Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .createTable('app_user')
        .addColumn('id', 'serial', cb => cb.primaryKey())
        .addColumn('username', 'text', cb => cb.notNull())
        .addColumn('email', 'text', cb => cb.notNull().unique())
        .addColumn('google_id', 'text', cb => cb.notNull().unique())
        .addColumn('picture', 'text')
        .execute();

    await db.schema
        .createTable('user_session')
        .addColumn('id', 'serial', cb => cb.primaryKey())
        .addColumn('token', 'text', cb => cb.notNull().unique())
        .addColumn('user_id', 'serial', cb => cb.references('app_user.id'))
        .addColumn('expires_at', 'timestamptz', cb => cb.notNull())
        .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
    await db.schema.dropTable('user_session').execute();
    await db.schema.dropTable('app_user').execute();
}
