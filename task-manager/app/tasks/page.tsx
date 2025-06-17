'use client';

import React, {useEffect, useState} from 'react';
import type {task as PrismaTask} from '@/app/generated/prisma/client';
import {Button} from '@radix-ui/themes';
import Link from "next/link";
import {useRouter} from 'next/navigation';
import TaskCard from '@/app/Components/tasks/TaskCard';
import BubblePopTaskCard from '@/app/Components/animations/BubblePopTaskCard';
import confetti from "canvas-confetti";


const TasksPage = () => {
    const [tasks, setTasks] = useState<PrismaTask[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.ceil(total / pageSize);
    const router = useRouter();
    const [visibleTasks, setVisibleTasks] = useState<Record<number, boolean>>({});
    const [filters, setFilters] = useState({
        status: '',
        category: '',
        sortBy: 'dueDate',
        sortOrder: 'asc',
        page: 1,
        pageSize: 10
    });


    useEffect(() => {
        const queryParams = new URLSearchParams({
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
            page: filters.page.toString(),
            pageSize: filters.pageSize.toString(),
        });

        if (filters.status) queryParams.set("status", filters.status);
        if (filters.category) queryParams.set("category", filters.category);

        setLoading(true);
        fetch(`/api/tasks?${queryParams.toString()}`)
            .then(res => res.json())
            .then(data => {
                setTasks(data.tasks);
                setTotal(data.total);

                // Initialize all as visible
                const newVisibility: Record<number, boolean> = {};
                // @ts-ignore
                data.tasks.forEach(task => {
                    newVisibility[task.taskId] = true;
                });
                setVisibleTasks(newVisibility);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [filters]);


    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        // Step 1: trigger exit animation
        setVisibleTasks(prev => ({ ...prev, [id]: false }));

        // Step 2: wait for animation to finish (e.g., 300ms)
        setTimeout(async () => {
            await fetch(`/api/tasks/${id}`, { method: 'DELETE' });

            // Step 3: remove from list
            setTasks(prev => prev.filter(task => task.taskId !== id));
            setVisibleTasks(prev => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
        }, 300); // match the framer-motion exit duration
    };


    const handleComplete = async (id: number) => {
        const res = await fetch(`/api/tasks/${id}/complete`, { method: 'PATCH' });

        if (res.ok) {
            const updated = await res.json();
            setTasks(prev =>
                prev.map(task =>
                    task.taskId === id ? updated : task
                )
            );
            // 🎉 Trigger confetti animation
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        } else {
            console.error('❌ Failed to complete task');
        }
    };


    return (
        <div className="p-6 space-y-6">
            <div>
                <Button asChild>
                    <Link href="/tasks/new">+ New Task</Link>
                </Button>
            </div>

            <h1 className="text-2xl font-bold">📋 My Tasks</h1>

            {/* ✅ Filter/Sort Controls */}
            <div className="flex flex-wrap gap-4 items-center my-4">
                <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({...prev, sortBy: e.target.value}))}
                    className="p-2 border rounded"
                >
                    <option value="createdAt">Created At</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                </select>

                <select
                    value={filters.sortOrder}
                    onChange={(e) => setFilters(prev => ({...prev, sortOrder: e.target.value}))}
                    className="p-2 border rounded"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

                <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
                    className="p-2 border rounded"
                >
                    <option value="">All Statuses</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>

            {/* 🧾 Task List Section */}
            {loading ? (
                <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <BubblePopTaskCard key={task.taskId} isVisible={visibleTasks[task.taskId]}>
                            <TaskCard
                                task={task}
                                onDelete={handleDelete}
                                onComplete={handleComplete}
                            />
                        </BubblePopTaskCard>
                    ))}
                </div>

            )}
            <div className="flex justify-center items-center gap-4 mt-4">
                <Button
                    disabled={filters.page <= 1}
                    onClick={() => setFilters(prev => ({...prev, page: prev.page - 1}))}
                >
                    Previous
                </Button>
                <span>
        Page {filters.page} of {Math.ceil(total / filters.pageSize)}
    </span>
                <Button
                    disabled={filters.page >= Math.ceil(total / filters.pageSize)}
                    onClick={() => setFilters(prev => ({...prev, page: prev.page + 1}))}
                >
                    Next
                </Button>
            </div>

        </div>

    );
};

export default TasksPage;
