"use client";
import React from 'react';
import Link from "next/link";
import classnames from "classnames";
import {usePathname} from "next/navigation";


const Dashboard = () => {
    const currentPath = usePathname();
    const links = [
        {label: 'Add a Task', href: '/tasks/new'},
        {label: 'Add a User', href: '/users/new'},
        {label: 'My Completed Tasks List', href: '/tasks'}];
    // @ts-ignore
    return <>
        <header>Welcome to your personal task manager!</header>
        <ul className='flex space-x-6'>
            {links.map(link=>
                <Link
                    key={link.href}
                    className={classnames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true,
                    })}
                    href={link.href}>{link.label}</Link>)}
        </ul>
    </>
}
export default Dashboard
