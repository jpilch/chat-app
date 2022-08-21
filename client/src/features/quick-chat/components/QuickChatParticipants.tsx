import styles from "./QuickChatParticipants.module.css";

import QuickChatParticipant from "./QuickChatParticipant";

import { useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../auth/authSlice";
import { selectParticipants } from "../state/quickChatSlice";

import uniqueId from "lodash/uniqueId";

function QuickChatParticipants() {

    let participants = useAppSelector(selectParticipants);

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
                        key={uniqueId(participant.username)}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuickChatParticipants;