'use client'

import { Button } from '@radix-ui/themes';
import Link from 'next/link';


const TasksPage = () => {
    return (
        <div><Button className={`px-3 text-sm py-2 rounded-md cursor-pointer bg-white text-black `}>
            <Link className='text-center text-black border-4' href='/tasks/new'>New Task</Link>
        </Button></div>
    )
}
export default TasksPage
