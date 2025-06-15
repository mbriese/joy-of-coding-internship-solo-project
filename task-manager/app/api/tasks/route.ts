import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "../../generated/prisma/client"
import {createTaskSchema} from "@/app/validationSchemas";

const prisma = new PrismaClient();

//const prisma = new PrismaClient()
//const DEFAULT_USER_ID = 1;
const userId =1;

export async function GET(request: NextRequest) {
    const tasks = await prisma.task.findMany({
        where: { userId: 1 }, // ✅ default user
        orderBy: { dueDate: 'asc' }, // (Optional) better ordering
    });
    return NextResponse.json(tasks);
}


export async function POST(request: NextRequest) {
    console.log('in the task post function');

    const body = await request.json();
    console.log(JSON.stringify(body));
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success) {
        console.log('validation failed: ', validation.error.format());
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const {
        title,
        description,
        status,
        category,
        dueDate,
        priority,
        importance,
    } = validation.data;

    const createdAt = new Date();
    const updatedAt = new Date();
    const dueDateObj = new Date(dueDate ?? Date.now());

    const newTask = await prisma.task.create({
        data: {
            title,
            description,
            status: 'OPEN',
            category: 'OTHER',
            priority: 'MEDIUM',
            importance: 'MEDIUM',
            updatedAt: updatedAt || new Date(),
            createdAt: createdAt || new Date(),
            dueDate: dueDateObj,
            userId: 1,
        },
    });
    return NextResponse.json(newTask, { status: 201} );
}
