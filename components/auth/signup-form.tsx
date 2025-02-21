import { useActionState } from 'react';

const initialSignUpState = {
    message: '',
};

async function signupAction(_prev, formData) {
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
        if (error instanceof Error) {
            return {
                message: error.message,
            };
        }
        console.error(error);
    }
}

export function SignUpForm() {
    const [state, action, isPending] = useActionState(
        signupAction,
        initialSignUpState,
    );

    if (isPending) return <p>Loading...</p>;

    return (
        <form action={action}>
            <label htmlFor='form-signup.username'>Username</label>
            <input
                id='form-signup.username'
                name='username'
                required
                minLength={4}
                maxLength={31}
            />
            <br />
            <label htmlFor='form-signup.email'>Email</label>
            <input
                type='email'
                id='form-signup.email'
                name='email'
                autoComplete='username'
                required
            />
            <br />
            <label htmlFor='form-signup.password'>Password</label>
            <input
                type='password'
                id='form-signup.password'
                name='password'
                autoComplete='new-password'
                required
            />
            <br />
            <button>Continue</button>
            <p>{state?.message}</p>
        </form>
    );
}
