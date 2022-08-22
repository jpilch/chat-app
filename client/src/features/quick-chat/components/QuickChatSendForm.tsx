import classNames from "classnames";
import { FormEvent, useState } from "react";
import useQuickChatService from "../hooks/useQuickChatService";
import styles from "./QuickChatSendForm.module.css";

function QuickChatSendForm() {
    const quickChatService = useQuickChatService();

    const [message, setMessage] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        quickChatService.sendMessage(message);
        setMessage("");
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <input
                required
                type="text"
                placeholder="Message"
                className={styles.form__input}
                value={message}
                onChange={e => {
                    setMessage(e.target.value);
                    quickChatService.setUserTyping();
                }}
            />
            <button
                type="submit"
                className={classNames(styles.form__button, styles["form__button--submit"])}
            >
                Send
            </button>
        </form>
    );
}

export default QuickChatSendForm;