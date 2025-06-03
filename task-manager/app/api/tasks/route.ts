import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { PrismaClient } from "../../generated/prisma/client";
import { createTaskSchema } from "@/app/validationSchemas";

const client = new PrismaClient();

export async function GET() {
    try {
        const tasks = await prisma.task.findMany({
            include: {
                user: true,
            },
        });
        return NextResponse.json(tasks);
    } catch (err) {
        console.error('Fetch error:', err);
        return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    console.log('in task post function');
    const body = await request.json() as {
        title: string;
        description: string;
        userId: number;
        fname: string;
        lname: string;
        email: string;
        userDescription: string;
    };
    console.log(JSON.stringify(body));
    const { title, description, userId } = await createTaskSchema.parseAsync(body);

    const newTask = await client.task.create({
        data: {
            title,
            description,
            status: 'OPEN',
            category: 'OTHER',
            priority: 'MEDIUM',
            importance: 'MEDIUM',
            completed: 'INCOMPLETE',
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
            userId,
        },
            include: {
                    user: true,
                    },
    });
    return NextResponse.json(newTask, { status: 201 });
}
