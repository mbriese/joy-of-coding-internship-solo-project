'use client'
import React from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import Spinner from "@/app/Components/Spinner";


const NewTasksPage = () => {
    return (
        <div><Button>
            <Link href='/tasks/new'>New Task</Link>
        </Button></div>
    )
}
export default NewTasksPage
