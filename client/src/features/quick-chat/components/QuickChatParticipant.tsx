import styles from "./QuickChatParticipant.module.css";

function QuickChatParticipant({ username }: { username: string }) {
    return (
        <div className={styles.participant}>
            <img
                src='/src/assets/avatar.jpg'
                alt="avatar"
                className={styles.participant__img}
            />
            <p className={styles.participant__username}>{username}</p>
        </div>
    );
}

export default QuickChatParticipant;