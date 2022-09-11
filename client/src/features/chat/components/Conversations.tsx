import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchUserConversations } from "../state/conversationSlice";
import styles from "./Conversations.module.css";

export function Conversations() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserConversations());
    }, []);

    return (
        <section className={styles.chat__contacts}>
            contacts
        </section>
    )
}

export default Conversations