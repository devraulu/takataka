import { useActionState } from 'react';

const initial2FASetUpState = {
    message: '',
};

export async function setup2FAAction(_prev: unknown, formData: FormData) {
    try {
        const response = await fetch('/api/auth/user/totp', {
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

    return {
        success: true,
    };
}

export function TwoFactorSetUpForm(props: { encodedTOTPKey: string }) {
    const [state, action, isPending] = useActionState(
        setup2FAAction,
        initial2FASetUpState,
    );

    if (isPending) return <p>Loading...</p>;

    return (
        <form action={action}>
            <input name='key' value={props.encodedTOTPKey} hidden required />
            <label htmlFor='form-totp.code'>Verify the code from the app</label>
            <input id='form-totp.code' name='code' required />
            <br />
            <button>Save</button>
            <p>{state.message}</p>
        </form>
    );
}
