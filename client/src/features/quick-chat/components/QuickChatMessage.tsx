import styles from "./QuickChatMessage.module.css";

function QuickChatMessage({
    message,
    byCurrentUser,
}: {
    message: string,
    byCurrentUser: boolean,
}) {

    const contentClass: string = byCurrentUser
        ? `${styles.message__content} ${styles["message__content--current"]}`
        : styles.message__content;

    return (
        <div className={styles.message}>
            <p className={contentClass}>
                {message}
            </p>
        </div>
    );
}

export default QuickChatMessage;