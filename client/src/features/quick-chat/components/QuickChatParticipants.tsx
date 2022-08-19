import styles from "./QuickChatParticipants.module.css";

import QuickChatParticipant from "./QuickChatParticipant";

import { useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../auth/authSlice";
import { selectParticipants } from "../state/quickChatSlice";

function QuickChatParticipants() {

    const username = useAppSelector(selectUsername);
    let participants = useAppSelector(selectParticipants);

    participants = participants.map(name => {
        return name === username ? name + " (You)" : name;
    });

    return (
        <div className={styles.sidebar}>
            <p className={styles.sidebar__name}>Participants</p>
            <input
                type="text"
                className={styles.sidebar__search}
                placeholder="Search"
            />
            <div className={styles.sidebar__entries}>
                {participants.map(participant => (
                    <QuickChatParticipant
                        username={participant}
                        key={participant}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuickChatParticipants;