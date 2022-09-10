import { PrismaClient } from "@prisma/client";
import { UserInDb } from "../../auth/types";
import { contactService } from "../../contact/services";
import { conversationService } from "../../conversation/services";

const prisma = new PrismaClient();

export async function findAll(): Promise<UserInDb[]> {
    return prisma.user.findMany();
}

export async function findByUsername(username: string) {
    const user = await prisma.user.findUnique({
        where: { username }
    });
    if (!user) throw new Error("User does not exist");
    return user;
}

export async function findById(id: number) {
    const user = await prisma.user.findUnique({
        where: { id }
    });
    if (!user) throw new Error("User does not exist");
    return user;
}

export async function findAllConversationsFrom({ userId }: { userId: number }) {
    const contacts = await contactService.findAllFrom(userId);
    const contactConversations = await conversationService.findAllFrom(contacts);
    return contactConversations;
}

export const userService = {
    findAll,
    findByUsername,
    findById,
    findAllConversationsFrom
};