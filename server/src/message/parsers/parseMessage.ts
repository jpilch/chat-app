import { ParsingError } from "../../common/errors";
import { parseId } from "../../common/parsers";
import { isString } from "../../common/utils";
import { Message } from "../types";

type MessageFields = { content: unknown, authorId: unknown, conversationId: unknown };

function parseMessageContent(content: unknown): string {
    if (!content || !isString(content)) {
        throw new ParsingError("Message content incorrect or missing");
    }
    return content;
}

export function parseMessage({ content, authorId, conversationId }: MessageFields): Message {
    return {
        content: parseMessageContent(content),
        authorId: parseId(authorId),
        conversationId: parseId(conversationId),
    };
}