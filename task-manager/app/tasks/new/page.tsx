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
        console.log("🟢 handleCreate called with:", data);
        try {
            setSubmitting(true);
            console.log('🧪 Submitting data to API:', data); // Add this!
            await axios.post('/api/tasks', data); // This should work now
            router.push('/tasks');
        } catch (err: any) {
            console.error('❌ Axios error:', err?.response?.data || err.message);
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
