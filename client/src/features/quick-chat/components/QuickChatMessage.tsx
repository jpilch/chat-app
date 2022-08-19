import styles from "./QuickChatMessage.module.css";

import { QuickMessage } from "../types";

function QuickChatMessage({
    message,
    byCurrentUser,
}: {
    message: QuickMessage,
    byCurrentUser: boolean,
}) {

    const author: string = byCurrentUser
        ? "You"
        : message.author;

    const contentClass: string = byCurrentUser
        ? `${styles.message__content} ${styles["message__content--current"]}`
        : styles.message__content;

    return (
        <div className={styles.message}>
            <p className={styles.message__author}>
                {author}:
            </p>
            <p className={contentClass}>
                {message.content}
            </p>
        </div>
    );
}

export default QuickChatMessage;