'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { useState } from 'react';
import ErrorMessage from '@/app/Components/ErrorMessage';
import Spinner from '@/app/Components/Spinner';

export type TaskFormData = z.infer<typeof createTaskSchema>;

type TaskFormProps = {
    initialValues?: Partial<TaskFormData>;
    onSubmit: (data: TaskFormData) => void;
    isSubmitting?: boolean;
    error?: string;
};

const TaskForm = ({
                      initialValues = {},
                      onSubmit,
                      isSubmitting = false,
                      error,
                  }: TaskFormProps) => {
    // ✅ Destructure initial values with fallbacks
    const {
        title = '',
        description = '',
        status = 'OPEN',
        category = '',
        dueDate = '',
        priority = 'NORMAL',
        importance = 'NORMAL',
        completed = false,
    } = initialValues;

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskFormData>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title,
            description,
            status,
            category,
            dueDate,
            priority,
            importance,
            completed,
        },
    });

    return (
        <div className="max-w-xl space-y-5">
            {error && (
                <Callout.Root color="red">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextField.Root placeholder="Title" {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <label>Status</label>
                <select {...register('status')}>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
                <ErrorMessage>{errors.status?.message}</ErrorMessage>

                <TextField.Root placeholder="Category" {...register('category')} />
                <ErrorMessage>{errors.category?.message}</ErrorMessage>

                <label>Due Date</label>
                <input type="date" {...register('dueDate')} />
                <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>

                <label>Priority</label>
                <select {...register('priority')}>
                    <option value="LOW">Low</option>
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High</option>
                </select>
                <ErrorMessage>{errors.priority?.message}</ErrorMessage>

                <label>Importance</label>
                <select {...register('importance')}>
                    <option value="LOW">Low</option>
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High</option>
                </select>
                <ErrorMessage>{errors.importance?.message}</ErrorMessage>

                <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register('completed')} />
                    <span>Completed</span>
                </label>
                <ErrorMessage>{errors.completed?.message}</ErrorMessage>

                <Button disabled={isSubmitting}>
                    Submit Task {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default TaskForm;
