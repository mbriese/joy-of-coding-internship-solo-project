import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // ✅ shared client
import { CategoryType, Status, Priority, Importance } from '@/app/generated/prisma/client';
import { createTaskSchema } from '@/app/validationSchemas';



// GET /api/tasks/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const taskId = parseInt(params.id);
    if (isNaN(taskId)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const taskId = parseInt(params.id);
    const body = await req.json();

    const parsed = createTaskSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
            title: data.title,
            description: data.description,
            category: CategoryType[data.category as keyof typeof CategoryType],
            completed: data.completed,
            dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
            // 👇 Convert string to enum using enum object
            status: Status[data.status as keyof typeof Status],
            priority: Priority[data.priority as keyof typeof Priority],
            importance: Importance[data.importance as keyof typeof Importance],
        },
    });

    return NextResponse.json(updatedTask);
}

