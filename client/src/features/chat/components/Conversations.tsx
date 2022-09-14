import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ComponentLoadingFallback from "../../common/components/ComponentLoadingFallback";
import { RequestStatus } from "../../common/types";
import { fetchUserConversations, selectConversations, selectConversationsStatus } from "../state/conversationSlice";
import Conversation from "./Conversation";
import styles from "./Conversations.module.css";

export function Conversations() {
    const dispatch = useAppDispatch();

    const conversations = useAppSelector(selectConversations);
    const conversationsStatus = useAppSelector(selectConversationsStatus);

    useEffect(() => {
        /* passing null here because TS complains that it
           is required to pass parameter for this action,
           even if I set the default parameter value to null */
        dispatch(fetchUserConversations(null));
    }, []);

    if (conversationsStatus === RequestStatus.pending) {
        return <></>
    }

    if (conversationsStatus === RequestStatus.rejected) {
        return (
            <p>Failed to fetch</p>
        )
    }

    return (
        <section className={styles.chat__conversations}>
            {conversations.map(conversation => {
                return <Conversation conversation={conversation} />
            })}
        </section>
    )
}

export default Conversations