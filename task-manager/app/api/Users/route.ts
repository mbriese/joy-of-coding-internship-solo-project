import {NextRequest, NextResponse} from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";


const createUserSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().min(1),
})

export async function POST (request: NextRequest) {
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const newUser = await prisma.task.create({
        data: {name: body.name, email: body.email}
    });
    return NextResponse.json(newUser, {status: 201});
}