'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/Components/ErrorMessage';
import Spinner from '@/app/Components/Spinner';
import { createUserSchema } from '@/app/validationSchemas';

export type UserFormData = z.infer<typeof createUserSchema>;

type UserFormProps = {
    initialValues?: Partial<UserFormData>;
    onSubmit: (data: UserFormData) => void;
    isSubmitting?: boolean;
    error?: string;
};

const UserForm = ({
                      initialValues = {},
                      onSubmit,
                      isSubmitting = false,
                      error,
                  }: UserFormProps) => {
    const {
        name = '',
        email = '',
        details = '',
        createdAt,
        updatedAt,
    } = initialValues;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name,
            email,
            details,
            createdAt,
            updatedAt,
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
                <TextField.Root placeholder="Name" {...register('name')} />
                <ErrorMessage>{errors.name?.message}</ErrorMessage>

                <TextField.Root placeholder="Email" {...register('email')} />
                <ErrorMessage>{errors.email?.message}</ErrorMessage>

                <TextField.Root placeholder="Details" {...register('details')} />
                <ErrorMessage>{errors.details?.message}</ErrorMessage>

                <Button disabled={isSubmitting}>
                    Submit User {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default UserForm;
