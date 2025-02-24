import { Button } from '#root/components/ui/button';
import { globalGETRateLimit } from '#root/lib/server/request';
import { getCurrentSession } from '#root/lib/server/session';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

// export const getServerSideProps: GetServerSideProps = async c => {
//     if (!globalGETRateLimit(c)) {
//         return { redirect: { destination: '/429', permanent: false } };
//     }
//
//     const { user } = await getCurrentSession(c);
//
//     if (user != null) {
//         return { redirect: { destination: '/', permanent: false } };
//     }
//     return { props: {} };
// };

export default function SignupPage() {
    return (
        <div className=''>
            <h1 className=''>Welcome back!</h1>
            <Button asChild variant='secondary'>
                <Link href='/api/auth/login/google'>Sign in with Google</Link>
            </Button>
        </div>
    );
}
