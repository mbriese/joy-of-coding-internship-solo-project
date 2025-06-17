import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { CategoryType, Status, Priority, Importance } from '@/app/generated/prisma/client';
import { createTaskSchema } from '@/app/validationSchemas';

// ✅ PATCH /api/tasks/[id]/complete
export async function PATCH(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    const localparams = await params
    const taskId = parseInt(localparams.id, 10);

    if (isNaN(taskId)) {
        return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
        where: { taskId },
        data: { status: 'COMPLETED' },
    });

    return NextResponse.json(updatedTask);
}
