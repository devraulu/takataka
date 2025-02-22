export default async function loginAction(_prev: unknown, formData: FormData) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            return {
                message: await response.text(),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            message: 'Something went wrong. Please try again.',
        };
    }
}
