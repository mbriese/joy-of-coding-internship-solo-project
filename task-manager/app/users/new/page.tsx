'use client';
import {Button, Callout, TextField} from "@radix-ui/themes"

import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useRouter} from "next/navigation";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {createUserSchema} from "@/app/validationSchemas";
import {z} from 'zod';
import ErrorMessage from "@/app/Components/ErrorMessage";
import Spinner from "@/app/Components/Spinner";

type UserForm = z.infer<typeof createUserSchema>;

const NewUserPage = () => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<UserForm>({
        resolver: zodResolver(createUserSchema),
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit =handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/users', data);
            router.push('/users');
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
                <TextField.Root placeholder="Name" {...register("name")}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>

                <ErrorMessage>{errors.name?.message}</ErrorMessage>
                <TextField.Root placeholder="email" {...register("email")}>
                    <TextField.Slot>
                    </TextField.Slot>
                </TextField.Root>


                <ErrorMessage>{errors.email?.message}</ErrorMessage>

                <Button disabled={isSubmitting}>Submit New User{isSubmitting && <Spinner/>}</Button>
            </form>
        </div>
    )
}
export default NewUserPage


