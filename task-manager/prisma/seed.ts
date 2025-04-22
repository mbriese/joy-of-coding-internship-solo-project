import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        data: [
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Jane Smith', email: 'jane@example.com' },
            { name: 'Bob Johnson', email: 'bob@example.com' },
        ],
    })

    const users = await prisma.user.findMany()
    console.log('Seeded users:', users)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
