import {z} from "zod";

export const createTaskSchema
    = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    updatedAt: z.date().optional(),
    createdAt: z.date().optional(),
    dueDate: z.date().optional()
});

export const createUserSchema
    = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    email: z.string().min(1, 'email is required').max(255),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});