import { db } from '#root/database/dialect';

export function verifyEmailInput(email: string): boolean {
    return /^.+@.+\..+$/.test(email) && email.length < 256;
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
    const row = await db
        .selectFrom('appUser')
        .select(eb => eb.fn.countAll().as('emailCount'))
        .where('email', '=', email)
        .executeTakeFirst();

    if (!row) throw new Error();

    return Number(row.emailCount) === 0;
}
