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
            <div>
                <div><Button>
                    <Link href='/users/new'>New User</Link>
                </Button></div>
            </div>
    )
}
export default UserPage

