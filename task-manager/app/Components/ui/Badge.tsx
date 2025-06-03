'use client';
import { labelFormatter } from "@/app/utils/formatters";
import {
    Priority,
    Status,
    CategoryType,
    Importance,
} from '@/app/generated/prisma/client';

type BadgeProps =
    | { type: 'priority'; value: Priority }
    | { type: 'status'; value: Status }
    | { type: 'category'; value: CategoryType }
    | { type: 'importance'; value: Importance };

const badgeStyles = {
    priority: {
        HIGH: 'bg-red-100 text-red-700',
        MEDIUM: 'bg-yellow-100 text-yellow-800',
        LOW: 'bg-green-100 text-green-700',
    },
    importance: {
        HIGH: 'bg-red-100 text-red-700',
        MEDIUM: 'bg-yellow-100 text-yellow-800',
        LOW: 'bg-gray-100 text-gray-700',
    },
    category: {
        WORK: 'bg-blue-100 text-blue-700',
        PERSONAL: 'bg-purple-100 text-purple-700',
        ERRANDS: 'bg-green-100 text-green-700',
        HEALTH: 'bg-pink-100 text-pink-700',
        FINANCE: 'bg-yellow-100 text-yellow-700',
        LEARNING: 'bg-indigo-100 text-indigo-700',
        OTHER: 'bg-gray-200 text-gray-800',
    },
    status: {
        OPEN: 'bg-gray-100 text-gray-700',
        IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
        CLOSED: 'bg-green-100 text-green-800',
    },
};

const Badge = ({ type, value }: BadgeProps) => {
    let style = '';

    if (type === 'priority') {
        style = badgeStyles.priority[value as Priority];
    } else if (type === 'importance') {
        style = badgeStyles.importance[value as Importance];
    } else if (type === 'status') {
        style = badgeStyles.status[value as Status];
    } else if (type === 'category') {
        style = badgeStyles.category[value as CategoryType];
    }

    return (
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${style}`}>
       {labelFormatter(value)}
        </span>
    );
};

export default Badge;
