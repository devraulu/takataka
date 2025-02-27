import loginAction from '#root/lib/actions/auth/login-action';
import { useActionState } from 'react';

const initialState = {
    message: '',
};

export default function LoginForm() {
    const [state, action, isPending] = useActionState(
        loginAction,
        initialState,
    );

    return (
        <form action={action}>
            <label htmlFor='form-login.email'>Email</label>
            <input
                type='email'
                id='form-login.email'
                name='email'
                autoComplete='username'
                required
            />
            <br />
            <label htmlFor='form-login.password'>Password</label>
            <input
                type='password'
                id='form-login.password'
                name='password'
                autoComplete='current-password'
                required
            />
            <br />
            <button>Continue</button>
            <p>{state?.message}</p>
        </form>
    );
}
