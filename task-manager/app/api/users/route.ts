import {NextRequest, NextResponse} from "next/server";
import { z } from "zod";
import {PrismaClient} from "../../generated/prisma/client"

const prisma = new PrismaClient()

const createUserSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().min(1),
    details: z.string().min(1).max(255),
})

export async function GET(req: NextRequest) {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST (request: NextRequest) {
    const body = await request.json();
    console.log(JSON.stringify(body));
    
    const validation = createUserSchema.safeParse(body);

     if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const newUser = await prisma.user.create({
        data: {name: body.name, email: body.email, details: body.details},
    });
    return NextResponse.json(newUser, {status: 201});
}