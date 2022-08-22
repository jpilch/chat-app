import { useRef } from "react";
import styles from "./QuickChatParticipant.module.css";

function QuickChatParticipant({ username, isTyping, isCurrent }: { username: string, isTyping: boolean, isCurrent: boolean }) {

    const statusRef = useRef<HTMLParagraphElement>(null);

    return (
        <div className={styles.participant}>
            <img
                src='/src/assets/avatar.jpg'
                alt="avatar"
                className={styles.participant__img}
            />
            <div>
                <p className={styles.participant__username}>{username}{" "}{isCurrent && '(you)'}</p>
                <p className={styles.participant__status}>{isTyping ? 'Typing...' : 'Inactive'}</p>
            </div>
        </div>
    );
}

export default QuickChatParticipant;