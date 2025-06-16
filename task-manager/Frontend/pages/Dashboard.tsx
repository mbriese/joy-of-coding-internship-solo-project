"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import type { task as PrismaTask } from "@/app/generated/prisma/client";

const Dashboard = () => {
    const currentPath = usePathname();
    const [topTasks, setTopTasks] = useState<PrismaTask[]>([]);

    const links = [
        { label: "Add Task", href: "/tasks/new" },
        { label: "Add User", href: "/users/new" },
        { label: "All Tasks", href: "/tasks" },
    ];

    useEffect(() => {
        const fetchTopTasks = async () => {
            try {
                const res = await fetch(
                    "/api/tasks?status=OPEN&sortBy=priority&sortOrder=desc&page=1&pageSize=3"
                );
                const data = await res.json();
                setTopTasks(data.tasks || []);
            } catch (err) {
                console.error("Failed to fetch top tasks:", err);
            }
        };

        void fetchTopTasks();
    }, []);

    return (
        <>
            <div className="p-6 col-start-3 row-start-2 flex max-w-lg flex-col space-y-6 font-bold dark:bg-white/10">
                Welcome to your personal task manager!
            </div>

            <ul className="flex -top-px -bot space-x-6 mb-4">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={classnames(
                                "top-2 px-4 py-2 rounded-md font-semibold transition-colors shadow-sm",
                                {
                                    "bg-blue-600 text-white hover:bg-blue-700":
                                        link.href === currentPath,
                                    "bg-zinc-100 text-zinc-700 hover:bg-zinc-200":
                                        link.href !== currentPath,
                                }
                            )}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">🔥 Top Priority Open Tasks</h2>
                {topTasks.length === 0 ? (
                    <p>No high-priority tasks found.</p>
                ) : (
                    <ul className="space-y-2">
                        {topTasks.map((task) => (
                            <li key={task.taskId} className="p-2 bg-white shadow rounded">
                                <p className="font-bold">{task.title}</p>
                                <p className="text-sm text-gray-600">{task.description}</p>
                                <p className="text-xs italic">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Dashboard;
