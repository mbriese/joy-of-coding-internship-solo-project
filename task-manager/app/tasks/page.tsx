'use client'
import React from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import Link from 'next/link';
import { z } from 'zod';




const NewTasksPage = () => {
    return (
        <div><Button>
            <Link href='/tasks/new'>New Task</Link>
        </Button></div>
    )
}
export default NewTasksPage
