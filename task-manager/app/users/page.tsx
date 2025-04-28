import React from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

// interface User {
//     id: number;
//     name: string;
// }
const UserPage = async () => {
    // const res = await fetch('data.url');
    // const users = await res.json();
    return (
        <>
            <div>
                <Button size="2" variant="soft">
                    <Link className='text-center text-black border-4' href='/users/new'>
                        New User
                    </Link>
                </Button>
            </div>
            <ul>
                this is the user page.
             </ul>
        </>
    )
}
export default UserPage

