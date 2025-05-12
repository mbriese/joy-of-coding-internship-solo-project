import {PrismaClient} from "../app/generated/prisma/client";
//const { PrismaClient } = require('../app/generated/prisma/client');
const prisma = new PrismaClient();

async function main() {
    const userZ = await prisma.user.upsert({
        where: { email: 'demoZ@example.com' },
        update: {},
        create: {
            name: 'Demo User Z',
            email: 'demoZ@example.com',
            details: 'this is a user detail string'
        },
    });

    const userY = await prisma.user.upsert({
        where: { email: 'demoY@example.com' },
        update: {},
        create: {
            name: 'Demo User Y',
            email: 'demoY@example.com',
            details: 'this is another user detail string'
        },
    });

    await prisma.task.createMany({
        data: [
            {
                title: 'Walk 10,000 steps',
                description: 'Time to move! Get your daily steps in.',
                status: 'OPEN',
                category: 'HEALTH',
                dueDate: new Date(),
                priority: 'NORMAL',
                importance: 'NORMAL',
                completed: false,
                userID: userZ.id,
            },
            {
                title: 'Journal 1 page',
                description: 'Reflect and write freely.',
                status: 'OPEN',
                category: 'OTHER',
                dueDate: new Date(),
                priority: 'LOW',
                importance: 'NORMAL',
                completed: false,
                userID: userY.id,
            },
        ],
    });

    console.log('✅ Seed completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
