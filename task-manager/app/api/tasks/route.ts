import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {createTaskSchema} from "@/app/validationSchemas";
// import { z } from "zod";

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
    const newTask = await prisma.task.create({
        data: {
            title,
            description,
            updatedAt: updatedAt || new Date(),
            createdAt: createdAt || new Date(),
        }
    });
    return NextResponse.json(newTask, {status: 201});
}