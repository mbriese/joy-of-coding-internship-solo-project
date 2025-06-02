import {z} from "zod";
import { Status, Priority, Importance, CategoryType, CompletedType } from '@/app/generated/prisma/client';


export const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    status: z.nativeEnum(Status),
    category: z.nativeEnum(CategoryType, {
        errorMap: (issue, ctx) => {
            if (issue.code === 'invalid_type' || issue.code === 'invalid_enum_value') {
                return { message: 'Category is required' };
            }
            return { message: ctx.defaultError };
        },
    }),
    dueDate: z.string().optional(),
    priority: z.nativeEnum(Priority),
    importance: z.nativeEnum(Importance),
    completed: z.nativeEnum(CompletedType),
});


export const createUserSchema
    = z.object({
    fname: z.string().min(1, 'First name is required').max(255),
    lname: z.string().min(1, 'Last name is required').max(255),
    email: z.string().min(1, 'email is required').max(255),
    description: z.string().min(1, 'Description is required').max(255),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});