import { Button } from '#root/components/ui/button';
import Link from 'next/link';
import { SiGoogle } from '@icons-pack/react-simple-icons';

export default function SigninPage() {
    return (
        <div className='content-grid h-full'>
            <div className='col-[content] h-full p-4 place-content-center text-center'>
                <h1 className='text-3xl font-semibold'>Welcome back!</h1>
                <Button asChild className='mt-12'>
                    <Link href='/api/auth/login/google'>
                        <SiGoogle size={20} />
                        Continue with Google
                    </Link>
                </Button>
            </div>
        </div>
    );
}
