import { PrismaClient } from "@prisma/client";
import { Message } from "../types";

const prisma = new PrismaClient();

function findAll() {
    return prisma.message.findMany();
}

function create({ content, authorId, conversationId }: Message) {
    return prisma.message.create({
        data: { content, authorId, conversationId }
    });
}

export const messageService = {
    findAll,
    create
}