import { PrismaClient } from "@prisma/client";
import { Contact, ContactIdDb } from "../types";

const prisma = new PrismaClient();

async function findAll() {
    return await prisma.userContacts.findMany();
}

async function create(ids: Contact) {
    const { firstId, secondId } = ids;
    const users = await prisma.user.findMany({
        where: { id: { in: [firstId, secondId] } },
    });
    if (users.length !== 2 || firstId === secondId) {
        throw new Error("Incorrect input data")
    };
    const contacts = await prisma.userContacts.createMany({
        data: [
            { userId: firstId, contactId: secondId },
            { userId: secondId, contactId: firstId },
        ],
    });
    return contacts;
}

export default { findAll, create }