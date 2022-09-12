import { BaseUser } from "../../common/types"
import { Conversation } from "./conversation"

export type UserConversation = {
    relation: {
        id: number,
        user: BaseUser,
        contact: BaseUser,
    },
    conversation: Conversation
}