import styles from "./Conversation.module.css";

import { UserConversation } from "../types"
import { formatDate } from "../../common/utils";
import { formatMessageContent } from "../../common/utils/formatMessageContent";

function Conversation({ conversation }: { conversation: UserConversation }) {
    return (
        <div className={styles.conversation}>
            <img
                src="/src/assets/user.png"
                alt=""
                className={styles.conversation__avatar}
            />
            <p className={styles.conversation__username}>
                {conversation.relation.contact.username}
            </p>
            <p className={styles.conversation__message}>
                {formatMessageContent(conversation.conversation.lastMessage.content)}
                {" - "}{formatDate(new Date(conversation.conversation.lastMessage.sentAt))}
            </p>
            <p className={styles.conversation__sentat}>

            </p>
        </div >
    )
}

export default Conversation