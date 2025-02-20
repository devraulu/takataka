import { db } from '#root/database/dialect';
import { sql } from 'kysely';

export function verifyEmailInput(email: string): boolean {
    return /^.+@.+\..+$/.test(email) && email.length < 256;
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
    const row = await db
        .selectFrom('appUser')
        .select([sql<number>`COUNT(*)`.as('emailCount')])
        .where('email', '=', email)
        .executeTakeFirst();

    if (!row) throw new Error();

    return row.emailCount === 0;
}
