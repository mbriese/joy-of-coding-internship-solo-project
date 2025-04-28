import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "../../generated/prisma/client"
import {createTaskSchema} from "@/app/validationSchemas"

const prisma = new PrismaClient()

export async function POST (request: NextRequest) {
    console.log('in task post function');
    const body = await request.json();
    console.log(JSON.stringify(body));
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400});
    }
    const {title, description} = validation.data;
    const updatedAt = new Date();
    const createdAt = new Date();
    const dueDate = new Date();

    // @ts-ignore
    // @ts-ignore
    const newTask = await prisma.task.create({
        data: {
            title,
            description,
            updatedAt: updatedAt || new Date(),
            createdAt: createdAt || new Date(),
            dueDate: dueDate || new Date()
        }
    });
    return NextResponse.json(newTask, {status: 201});
}