import { Message } from "./message"

export type Conversation = {
    id: number,
    membersHash: string,
    lastMessage: Message
}