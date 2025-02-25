import useSWR from 'swr';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LoaderPinwheel } from 'lucide-react';
import styles from './user.module.css';
import clsx from 'clsx';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '#root/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '#root/components/ui/dropdown-menu';

import axios from 'axios';
const logout = async () => axios.post('/api/auth/logout');

export default function UserMenu() {
    const { data, error, isLoading, mutate } = useSWR('/api/user/profile');
    console.log('data', data);

    if (data != null)
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className='flex gap-2 items-center'>
                        <Avatar className='size-7'>
                            <AvatarImage src='https://github.com/shadcn.png' />
                            <AvatarFallback>
                                {data.username.slice(0, 1)}
                            </AvatarFallback>
                        </Avatar>
                        <span className=''>{data.username}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={async () => {
                            await logout();
                            mutate(null);
                        }}
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

    return (
        <div className=''>
            <Button asChild>
                <Link
                    href='/signin'
                    className={clsx(styles.signIn, isLoading && styles.loading)}
                >
                    <span className={styles.text}>Sign in</span>
                    <span className={clsx(styles.spinner, 'animate-spin')}>
                        <LoaderPinwheel />
                    </span>
                </Link>
            </Button>
        </div>
    );
}
