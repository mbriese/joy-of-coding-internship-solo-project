'use client'

import { Button } from '@radix-ui/themes';
import Link from 'next/link';


const UserPage = () => {
    return (
        <div><Button><Link href='/users/new'>New User</Link></Button></div>
    )
}
export default UserPage

