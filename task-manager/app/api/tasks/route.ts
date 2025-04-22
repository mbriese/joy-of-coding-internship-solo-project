import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from '@prisma/client';
import {createIssueSchema} from "@/app/validationSchemas";
/*
 updated to include updatedAt and createdAt fields
 Postman request test: double quotes around title and description fields "title":"title" "description":"description"
*/
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const {title, description } = validation.data;
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
    return NextResponse.json(newTask, { status: 201} );
}
