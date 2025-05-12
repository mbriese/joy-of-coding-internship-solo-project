import {z} from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE']),
    category: z.string().min(1, 'Category is required'),
    dueDate: z.string().optional(), // 👈 input is string from <input type="date" />
    priority: z.enum(['LOW', 'NORMAL', 'HIGH']),
    importance: z.enum(['LOW', 'NORMAL', 'HIGH']),
    completed: z.boolean(),
});


export const createUserSchema
    = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    email: z.string().min(1, 'email is required').max(255),
    details: z.string().min(1, 'Details are required').max(255),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});