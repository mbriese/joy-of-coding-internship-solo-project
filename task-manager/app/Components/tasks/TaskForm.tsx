'use client';


import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { useState } from 'react';
import { Status, CategoryType, Priority, Importance } from '@/app/generated/prisma/client';
import ErrorMessage from '@/app/Components/ErrorMessage';
import Spinner from '@/app/Components/Spinner';
import confetti from 'canvas-confetti';

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
    const [isSuccess, setSuccess] = useState(false)
    const router = useRouter();
    const {
        title = '',
        description = '',
        status = undefined,
        category = undefined,
        dueDate = '',
        priority = undefined,
        importance = undefined,
        completed,
    } = initialValues;

    const {
        register,
        control,
        handleSubmit,
        reset,
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

    const handleInternalSubmit = handleSubmit(async (data) => {
        setSuccess(false);
        void onSubmit(data);  // calls the parent-provided function
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
        router.push('/tasks');
    });


    return (
        <div className="max-w-xl space-y-5">
            {error && (
                <Callout.Root color="red">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            {isSuccess && (
                <Callout.Root color="green">
                    <Callout.Text>✅ Task submitted successfully!</Callout.Text>
                </Callout.Root>
            )}


            <form onSubmit={handleInternalSubmit} className="space-y-4">
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
                    <option value="">-- Choose status --</option>
                    {Object.values(Status).map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
                <ErrorMessage>{errors.status?.message}</ErrorMessage>

                <TextField.Root placeholder="Category" {...register('category')} />
                <label>Category</label>
                <select {...register('category')}>
                    <option value="">-- Choose a category --</option>
                    {Object.values(CategoryType).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <ErrorMessage>{errors.category?.message}</ErrorMessage>

                <label>Due Date</label>
                <input type="date" {...register('dueDate')} />
                <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>

                <label>Priority</label>
                <select {...register('priority')}>
                    <option value="">-- Choose priority --</option>
                    {Object.values(Priority).map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
                <ErrorMessage>{errors.priority?.message}</ErrorMessage>


                <label>Importance</label>
                <select {...register('importance')}>
                    <option value="">-- Choose importance --</option>
                    {Object.values(Importance).map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
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
                <Button
                    type="button"
                    variant="outline"
                    color="gray"
                    onClick={() => {
                        reset(initialValues);         // ✅ resets initial values
                        setSuccess(false); // ✅ clears success state too, if needed
                    }}
                >
                    Cancel
                </Button>
            </form>
        </div>
    );
};

export default TaskForm;
