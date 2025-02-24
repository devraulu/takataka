import useSWR from 'swr';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function UserMenu() {
    const user = useSWR('/api/user/profile');

    console.log(user.data);

    return (
        <div className=''>
            <Button asChild>
                <Link href='/signin'>Sign in</Link>
            </Button>
        </div>
    );
}
