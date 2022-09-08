import styles from "./Window.module.css";

import Info from "./Info";
import Messages from "./Messages";
import Form from "./Form";

export function Window() {
    return (
        <section className={styles.chat__window}>
            <Info />
            <Messages />
            <Form />
        </section>
    )
}

export default Window