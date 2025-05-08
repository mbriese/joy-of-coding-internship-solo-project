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
        {label: 'My Completed tasks List', href: '/tasks'}];
    // @ts-ignore
    return <>
        <div className="col-start-3 row-start-3 flex max-w-lg flex-col space-y-6 font-bold
         bg-gray-100 p-2 dark:bg-white/10">Welcome to your personal task manager!</div>
        <ul className="flex -top-px -bot space-x-6">
            {links.map(link => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={classnames(
                            'top-2 px-4 py-2 rounded-md font-semibold transition-colors shadow-sm',
                            {
                                'bg-blue-600 text-white hover:bg-blue-700': link.href === currentPath,
                                'bg-zinc-100 text-zinc-700 hover:bg-zinc-200': link.href !== currentPath,
                            }
                        )}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>

    </>
}
export default Dashboard
