import { PrismaClient } from "@prisma/client";
import { ContactIdDb } from "../../contact/types";
import { ContactIncludingUsers } from "../../contact/types/contactIncludingUsers";
import { messageService } from "../../message/services";
import { ContactConversation } from "../types";
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
            },
            select: {
                id: true,
                membersHash: true,
            },
        });
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        contactConversation.conversation!.lastMessage = await messageService.findLastOfConversation(contactConversation.conversation!.id);
        res.push(contactConversation);
    }
    return res;
}

export const conversationService = {
    findAll,
    create,
    findAllFrom
};