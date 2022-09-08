import { PrismaClient } from "@prisma/client";
import { ContactIdDb } from "../../contact/types";
import { getConversationHash } from "../utils";

const prisma = new PrismaClient();

export function findAll() {
    return prisma.conversation.findMany();
}

export async function create({ userId, contactId }: ContactIdDb) {
    const membersHash = getConversationHash({ userId, contactId });
    const conversation = await prisma.conversation.findUnique({
        where: { membersHash },
    });
    if (conversation) throw new Error("Conversation already exists");
    return prisma.conversation.create({ data: { membersHash } });
}

export const conversationService = {
    findAll,
    create
}