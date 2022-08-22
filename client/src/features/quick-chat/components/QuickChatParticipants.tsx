import styles from "./QuickChatParticipants.module.css";

import QuickChatParticipant from "./QuickChatParticipant";

import { useAppSelector } from "../../app/hooks";
import { selectParticipants } from "../state/quickChatSlice";

import uniqueId from "lodash/uniqueId";
import { selectUsername } from "../../auth/authSlice";

function QuickChatParticipants() {

    let participants = useAppSelector(selectParticipants);
    let username = useAppSelector(selectUsername);

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
                        username={participant.username}
                        isTyping={participant.isTyping}
                        isCurrent={username === participant.username}
                        key={uniqueId(participant.username)}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuickChatParticipants;