import signupAction from '#root/lib/actions/auth/signup-action';
import { useActionState } from 'react';

const initialState = {
    message: '',
};

export function SignUpForm() {
    const [state, action, isPending] = useActionState(
        signupAction,
        initialState,
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
                defaultValue={'hello'}
            />
            <br />
            <label htmlFor='form-signup.email'>Email</label>
            <input
                type='email'
                id='form-signup.email'
                name='email'
                autoComplete='username'
                required
                defaultValue={'hello@hello.com'}
            />
            <br />
            <label htmlFor='form-signup.password'>Password</label>
            <input
                type='password'
                id='form-signup.password'
                name='password'
                autoComplete='new-password'
                required
                defaultValue={'securePa$$w0rd'}
            />
            <br />
            <button>Continue</button>
            <p>{state?.message}</p>
        </form>
    );
}
