import { QuickMessage } from "../types";
import { MessageGroup } from "../types";

export function groupMessages(messages: QuickMessage[]): MessageGroup[] {
    let res: MessageGroup[] = [];
    let currAuthor: string = "";
    let group: MessageGroup = {};

    for (let msg of messages) {
        if (msg.author !== currAuthor) {
            currAuthor = msg.author;
            group = {
                author: currAuthor,
                messages: [msg.content]
            };
            res.push(group);
        } else {
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            res[res.length - 1].messages!.push(msg.content);
        }
    }
    return res;
}

export default groupMessages;