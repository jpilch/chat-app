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

async function findLastOfConversation(conversationId: number): Promise<MessageInDb | null> {
    const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId }
    });
    if (!conversation) throw new Error("Conversation does not exist");
    const lastMessage = await prisma.message.findFirst({
        where: { conversationId },
        select: {
            content: true,
            authorId: true,
            sentAt: true,
            conversationId: true
        },
        orderBy: {
            sentAt: "desc"
        },
    });
    return lastMessage;
}

export const messageService = {
    findAll,
    create,
    findLastOfConversation
};