import styles from './QuickChatMessageGroup.module.css';

import uniqueId from "lodash/uniqueId";

import { MessageGroup } from "../types";
import QuickChatMessage from "./QuickChatMessage";

function QuickChatMessageGroup({
    messageGroup,
    byCurrentUser
}: {
    messageGroup: MessageGroup,
    byCurrentUser: boolean
}) {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-asertion */
    let messages: JSX.Element[] = messageGroup!
        .messages!.map((msg, idx) => (
            <QuickChatMessage
                message={msg}
                byCurrentUser={byCurrentUser}
                key={uniqueId(`${msg}-${idx}`)}
            />
        ))

    return (
        <div>
            <p className={styles.group__author}>{messageGroup.author}:</p>
            {messages}
        </div>
    )
}

export default QuickChatMessageGroup