import styles from "./QuickChatParticipants.module.css";

import QuickChatParticipant from "./QuickChatParticipant";

import { useAppSelector } from "../../app/hooks";
import { selectParticipants } from "../state/quickChatSlice";

import uniqueId from "lodash/uniqueId";
import { selectUsername } from "../../quick-auth/authSlice";
import { useState } from "react";

function QuickChatParticipants() {

    const participants = useAppSelector(selectParticipants);
    const username = useAppSelector(selectUsername);
    const [filter, setFilter] = useState<string>("");

    return (
        <div className={styles.sidebar}>
            <p className={styles.sidebar__name}>Participants</p>
            <input
                type="text"
                className={styles.sidebar__search}
                placeholder="Search"
                onChange={(e) => setFilter(e.target.value.toLocaleLowerCase())}
            />
            <div className={styles.sidebar__entries}>
                {participants
                    .filter(p => {
                        return filter
                            ? p.username.toLocaleLowerCase().includes(filter)
                            : true;
                    })
                    .map(participant => (
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