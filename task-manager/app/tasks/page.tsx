'use client';

import React, {useEffect, useState} from 'react';
import type { task as PrismaTask } from '@/app/generated/prisma/client';
import {Button } from '@radix-ui/themes';
import Link from "next/link";

import { useRouter } from 'next/navigation';
import TaskCard from '@/app/Components/tasks/TaskCard';
import type { task as TaskModel } from '@/app/generated/prisma/client';


// type Task = {
//     id: number;
//     title: string;
//     description?: string;
//     status: string;
//     priority: string;
//     importance: string;
//     dueDate: Date;
//     completed: boolean;
//     category: string;
// };

const TasksPage = () => {
    const [tasks, setTasks] = useState<PrismaTask[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        void (async function fetchTasks() {
            try {
                const res = await fetch('/api/tasks');
                const data = await res.json();
                setTasks(data);
            } catch (err) {
                console.error('Failed to fetch tasks:', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this task?')) return;
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        router.refresh(); // ✅ revalidate data
    };

    const handleComplete = async (id: number) => {
        await fetch(`/api/tasks/${id}/complete`, { method: 'PATCH' });
        router.refresh();
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <Button asChild>
                    <Link href="/tasks/new">+ New Task</Link>
                </Button>
            </div>

            <div>
                <h1 className="text-2xl font-bold">📋 My Tasks</h1>

                {loading ? (
                    <p>Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p>No tasks found.</p>
                ) : (
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDelete={handleDelete}
                                onComplete={handleComplete}
                            />
                        ))}
                    </div>

                )}
            </div>
        </div>
    );
};

export default TasksPage;
