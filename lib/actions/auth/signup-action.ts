export default async function signupAction(_prev: unknown, formData: FormData) {
    try {
        const response = await fetch('/api/auth/signup/session', {
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
        // if (error instanceof Error) {
        return {
            message: 'Something went wrong. Please try again.',
        };
        // }
    }
}
