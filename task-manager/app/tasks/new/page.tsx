'use client';
import {Button, Callout, TextField} from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";

import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {createTaskSchema} from "@/app/validationSchemas";
import {z} from 'zod';
import ErrorMessage from "@/app/Components/ErrorMessage";
import Spinner from "@/app/Components/Spinner";

type TaskForm = z.infer<typeof createTaskSchema>;

const NewTasksPage = () => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<TaskForm>({
        resolver: zodResolver(createTaskSchema),
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit =handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/tasks', data);
            router.push('/tasks');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setSubmitting(false);
            setError('An unexpected error occurred.');
        }

    })

    // @ts-ignore - added Callout
    return (
        <div className="max-w-xl space-y-3">
            {error &&
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>}
            <form
                className="max-w-xl space-y-3"
                onSubmit={onSubmit}>
                <TextField.Root placeholder="Title" {...register("title")}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>

                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    render={({field}) =>
                        <SimpleMDE placeholder="Description" {...field}/>}
                />

                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting}>Submit New Task{isSubmitting && <Spinner/>}</Button>
            </form>
        </div>
    )
}
export default NewTasksPage

