'use client';

import { Pencil, Trash2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import {
    Priority,
    CategoryType,
    Status,
    Importance,
    CompletedType,
} from '@/app/generated/prisma/client';

type TaskPropsModel = {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    importance: Importance;
    dueDate: Date;
    completed: CompletedType;
    category: CategoryType;
    status: Status;
};

type TaskCardProps = {
    task: TaskPropsModel;
    onDelete: (id: number) => void;
    onComplete: (id: number) => void;
};

const TaskCard = ({ task, onDelete, onComplete }: TaskCardProps) => {
    const formattedDueDate = new Date(task.dueDate).toLocaleDateString();

    const priorityColorMap: Record<Priority, string> = {
        URGENT: 'bg-red-100 text-red-700',
        HIGH: 'bg-orange-100 text-orange-700',
        NORMAL: 'bg-yellow-100 text-yellow-800',
        LOW: 'bg-green-100 text-green-700',
    };

    const importanceColorMap: Record<Importance, string> = {
        HIGH_IMPORTANCE: 'bg-red-100 text-red-700',
        IMPORTANT: 'bg-orange-100 text-orange-900',
        NORMAL: 'bg-yellow-100 text-yellow-800',
        NOT_IMPORTANT: 'bg-green-100 text-green-700',
    };

    const categoryColorMap: Record<CategoryType, string> = {
        WORK: 'bg-blue-100 text-blue-700',
        PERSONAL: 'bg-purple-100 text-purple-700',
        ERRANDS: 'bg-green-100 text-green-700',
        HEALTH: 'bg-pink-100 text-pink-700',
        FINANCE: 'bg-yellow-100 text-yellow-700',
        LEARNING: 'bg-indigo-100 text-indigo-700',
        OTHER: 'bg-gray-200 text-gray-800',
    };

    const statusColorMap: Record<Status, string> = {
        OPEN: 'bg-gray-100 text-gray-700',
        IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
        CLOSED: 'bg-green-100 text-green-800',
    };

    return (
        <div className="bg-white shadow rounded p-4 space-y-4">
            <div>
                <h3
                    className={`text-lg font-semibold ${
                        task.completed ? 'line-through text-gray-400' : ''
                    }`}
                >
                    {task.title}
                </h3>
                <p className="text-gray-600 mb-2">{task.description}</p>

                <div className="text-sm text-gray-500 space-y-1">
                    <div>
                        <strong>Category:</strong>{' '}
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${categoryColorMap[task.category]}`}>
              {task.category}
            </span>
                    </div>
                    <div>
                        <strong>Status:</strong>{' '}
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColorMap[task.status]}`}>
              {task.status}
            </span>
                    </div>
                    <div>
                        <strong>Priority:</strong>{' '}
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${priorityColorMap[task.priority]}`}>
              {task.priority}
            </span>
                    </div>
                    <div>
                        <strong>Importance:</strong>{' '}
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${importanceColorMap[task.importance]}`}>
              {task.importance}
            </span>
                    </div>
                    <div>
                        <strong>Due:</strong> {formattedDueDate}
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-4 border-t pt-3">
                <Link
                    href={`/tasks/${task.id}/edit`}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit task"
                >
                    <Pencil size={18} />
                </Link>

                <button
                    onClick={() => onComplete(task.id)}
                    className="text-green-600 hover:text-green-800"
                    title="Mark as complete"
                >
                    <CheckCircle size={18} />
                </button>

                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete task"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
