'use client'

import { Button } from '@radix-ui/themes';
import Link from 'next/link';


const TasksPage = () => {
    return (
        <div><Button size="2" variant="soft">
            <Link className='text-center text-black border-4' href='/tasks/new'>New Task</Link>
        </Button></div>
    )
}
export default TasksPage
