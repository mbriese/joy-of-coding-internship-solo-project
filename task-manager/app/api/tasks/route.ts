import {NextRequest, NextResponse} from "next/server";
import { prisma } from "../../lib/prisma";
import {PrismaClient} from "../../generated/prisma/client";
import {createTaskSchema} from "@/app/validationSchemas";

//const prisma = new PrismaClient()
const client = new PrismaClient();
//const DEFAULT_USER_ID = 1;
export async function GET() {
    try {
        const tasks = await prisma.task.findMany();
        return NextResponse.json(tasks);
    } catch (err) {
        console.error('Fetch error:', err);
        return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    console.log('in task post function');
    const body = await request.json() as Record<string, unknown>;
    console.log(JSON.stringify(body));
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const { title, description } = validation.data as { title: string; description: string };
    const updatedAt = new Date();
    const createdAt = new Date();
    const dueDate = new Date();

    const newTask = await client.task.create({
        data: {
            title,
            description,
            updatedAt,
            createdAt,
            dueDate,
        },
    });
    return NextResponse.json(newTask, { status: 201 });
}
