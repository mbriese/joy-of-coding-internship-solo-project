'use client';

import React, {useEffect, useState} from 'react';

import {Button } from '@radix-ui/themes';
import Link from "next/link";

type Task = {
    id: number;
    title: string;
    description?: string;
    priority: string;
    dueDate: string;
    completed: boolean;
    category?: string; // assuming this is optional in your schema
};

const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

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
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className={`border p-4 rounded-md ${
                                    task.completed ? 'bg-green-100' : 'bg-white'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="font-semibold">{task.title}</h2>
                                    <span className="text-sm text-gray-500">{task.priority}</span>
                                </div>
                                <p className="text-sm text-gray-600">{task.description}</p>
                                <p className="text-xs text-gray-400">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TasksPage;
