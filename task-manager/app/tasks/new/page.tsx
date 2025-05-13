'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TaskForm, { TaskFormData } from '../../Components/tasks/TaskForm';

const NewTasksPage = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const handleCreate = async (data: TaskFormData) => {
        try {
            setSubmitting(true);
            await axios.post('/api/tasks', data);
            router.push('/tasks');
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred.');
            setSubmitting(false);
        }
    };

    return (
        <TaskForm
            onSubmit={handleCreate}
            isSubmitting={isSubmitting}
            error={error}
        />
    );
};

export default NewTasksPage;
