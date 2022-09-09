import { ContactIncludingUsers } from "../../contact/types/contactIncludingUsers";
import { Conversation } from "./conversation";

export type ContactConversation = {
    relation: ContactIncludingUsers,
    conversation: Conversation | null
};