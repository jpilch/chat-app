import { Message, MessageInDb } from "../../message/types"

export type Conversation = {
    id: number,
    membersHash: string,
    lastMessage?: MessageInDb | null
}