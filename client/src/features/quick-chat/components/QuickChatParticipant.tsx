import { useRef } from "react";
import styles from "./QuickChatParticipant.module.css";

function QuickChatParticipant({ username, isTyping }: { username: string, isTyping: boolean }) {

    const statusRef = useRef<HTMLParagraphElement>(null);

    return (
        <div className={styles.participant}>
            <img
                src='/src/assets/avatar.jpg'
                alt="avatar"
                className={styles.participant__img}
            />
            <p className={styles.participant__username}>{username}</p>
            <p>{isTyping}</p>
        </div>
    );
}

export default QuickChatParticipant;