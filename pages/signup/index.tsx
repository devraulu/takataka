import { SignUpForm } from '#root/components/auth/signup-form';
import { globalGETRateLimit } from '#root/server/lib/request';
import { getCurrentSession } from '#root/server/lib/session';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async c => {
    if (!globalGETRateLimit(c)) {
        return { redirect: { destination: '/429', permanent: false } };
    }

    const { session, user } = await getCurrentSession(c);

    if (session != null) {
        if (!user.emailVerified) {
            return {
                redirect: {
                    destination: '/verify-email',
                    permanent: false,
                },
            };
        }

        if (!user.registered2fa) {
            return {
                redirect: { destination: '/2fa/setup', permanent: false },
            };
        }

        if (!session.twoFactorVerified) {
            return { redirect: { destination: '/2fa', permanent: false } };
        }

        return { redirect: { destination: '/', permanent: false } };
    }
    return { props: {} };
};

export default function SignupPage() {
    return (
        <>
            <h1>Create an account</h1>
            <p>
                Your username must be at least 3 characters long and your
                password must be at least 8 characters long.
            </p>
            <SignUpForm />
            <Link href='/login'>Sign in</Link>
        </>
    );
}
