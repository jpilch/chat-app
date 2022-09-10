import { PrismaClient } from "@prisma/client";
import { UserInDb } from "../../auth/types";
import { ContactIdDb } from "../../contact/types";
import { ContactIncludingUsers } from "../../contact/types/contactIncludingUsers";
import { conversationController } from "../controllers";
import { ContactConversation, Conversation } from "../types";
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

export async function findAllFrom(
    relationships: Array<ContactIncludingUsers>
): Promise<ContactConversation[]> {
    const res: Array<ContactConversation> = [];
    for (const relation of relationships) {
        const contactConversation: ContactConversation = { relation, conversation: null };
        contactConversation.conversation = await prisma.conversation.findUnique({
            where: {
                membersHash: getConversationHash({ userId: relation.user.id, contactId: relation.contact.id }),
            }, include: {
                messages: {
                    select: {
                        id: true,
                        content: true,
                        authorId: true,
                        sentAt: true
                    }
                }
            }
        });
        res.push(contactConversation);
    }
    return res;
}

export const conversationService = {
    findAll,
    create,
    findAllFrom
};