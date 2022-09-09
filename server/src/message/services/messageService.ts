import { PrismaClient } from "@prisma/client";
import { Message, MessageInDb } from "../types";

const prisma = new PrismaClient();

async function findAll(): Promise<MessageInDb[]> {
    return prisma.message.findMany();
}

async function create({ content, authorId, conversationId }: Message): Promise<MessageInDb> {
    return prisma.message.create({
        data: { content, authorId, conversationId }
    });
}

export const messageService = {
    findAll,
    create
}