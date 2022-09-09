export type MessageInDb = {
    content: string,
    authorId: number,
    conversationId: number,
    sentAt: Date
}