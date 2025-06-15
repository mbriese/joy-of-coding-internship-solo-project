import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // ✅ shared client
import { CategoryType, Status, Priority, Importance } from '@/app/generated/prisma/client';
import { createTaskSchema } from '@/app/validationSchemas';

// GET /api/tasks/[id]
export async function GET(request: NextRequest & {params: {id: string} } ) {
    const { id } = request.params;
    const taskId = parseInt(id as string);
    if (isNaN(taskId)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const task = await prisma.task.findUnique({ where: { taskId } });
    if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task);
}

export async function DELETE(request: NextRequest & {params: {id: string} }) {
    const { id } = request.params;
    const numericId = parseInt(id as string, 10);
    if (isNaN(numericId)) {
        return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
    }

    await prisma.task.delete({
        where: { taskId: numericId },
    });

    return NextResponse.json({ success: true });
}


export async function PATCH(req: NextRequest & { params: { id: string } })  {
    const { id } = req.params;
    const taskId = parseInt(id);
    const body = await req.json() as {
        title: string;
        description: string;
        status: string;
        category: string;
        dueDate: string;
        priority: string;
        importance: string;
        userId: number;
    };

    const parsed = createTaskSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    const updatedTask = await prisma.task.update({
        where: { taskId },
        data: {
            title: data.title,
            description: data.description,
            category: CategoryType[data.category as keyof typeof CategoryType],
            dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
            status: Status[data.status as keyof typeof Status],
            priority: Priority[data.priority as keyof typeof Priority],
            importance: Importance[data.importance as keyof typeof Importance],
        },
    });

    return NextResponse.json(updatedTask);
}
