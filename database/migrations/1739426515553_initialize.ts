import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .createTable('app_user')
        .addColumn('id', 'serial', cb => cb.primaryKey())
        .addColumn('username', 'text', cb => cb.notNull())
        .addColumn('email', 'text', cb => cb.notNull().unique())
        .addColumn('password_hash', 'text', cb => cb.notNull())
        .addColumn('topt_key', 'bytea')
        .addColumn('recovery_code', 'bytea')
        .execute();

    await db.schema
        .createTable('user_session')
        .addColumn('id', 'serial', cb => cb.primaryKey())
        .addColumn('token', 'text', cb => cb.notNull().unique())
        .addColumn('user_id', 'serial', cb => cb.references('app_user.id'))
        .addColumn('expires_at', 'timestamptz', cb =>
            cb.notNull().defaultTo(sql`now()`),
        )
        .addColumn('two_factor_verified', 'boolean', cb =>
            cb.notNull().defaultTo(false),
        )
        .execute();

    await db.schema
        .createTable('password_reset_session')
        .addColumn('id', 'serial', cb => cb.primaryKey())
        .addColumn('token', 'text', cb => cb.notNull().unique())
        .addColumn('user_id', 'serial', cb => cb.references('app_user.id'))
        .addColumn('email', 'text', cb => cb.notNull())
        .addColumn('email_verified', 'boolean', cb => cb.defaultTo(false))
        .addColumn('email_verification_code_hash', 'text', cb => cb.notNull())
        .addColumn('expires_at', 'timestamptz', cb => cb.notNull())
        .addColumn('two_factor_verified', 'boolean', cb => cb.defaultTo(false))
        .execute();

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

    await db.schema
        .createTable('session_email_verification_request')
        .addColumn('id', 'serial', cb => cb.primaryKey())
        .addColumn('token', 'text', cb => cb.unique().notNull())
        .addColumn('expires_at', 'timestamptz', cb => cb.notNull())
        .addColumn('email', 'text', cb => cb.notNull())
        .addColumn('code', 'text', cb => cb.notNull())
        .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
    await db.schema.dropTable('user_session').execute();
    await db.schema.dropTable('app_user').execute();
    await db.schema.dropTable('password_reset_session').execute();
    await db.schema.dropTable('signup_session').execute();
    await db.schema.dropTable('session_email_verification_request').execute();
}
