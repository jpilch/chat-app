import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearAll() {
    await prisma.message.deleteMany();
    await prisma.user.deleteMany();
    await prisma.userContacts.deleteMany();
    await prisma.conversation.deleteMany();
}

clearAll();