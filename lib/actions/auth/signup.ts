import Router from 'next/router';

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
        Router.push('/2fa/setup');
    } catch (error) {
        console.error(error);
        // if (error instanceof Error) {
        return {
            message: 'Something went wrong. Please try again.',
        };
        // }
    }
}
