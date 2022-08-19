import styles from "./QuickChat.module.css";

import QuickChatParticipants from "../components/QuickChatParticipants";
import QuickChatWindow from "../components/QuickChatWindow";
import QuickChatAuthWrapper from "../components/QuickChatAuthWrapper";

function QuickChat() {
    return (
        <QuickChatAuthWrapper>
            <main className={styles.chat}>
                <section className={styles.chat__sidebar}>
                    <QuickChatParticipants />
                </section>
                <section className={styles.chat__window}>
                    <QuickChatWindow />
                </section>
            </main>
        </QuickChatAuthWrapper>
    );
}

export default QuickChat;