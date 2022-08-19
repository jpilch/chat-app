import styles from "./QuickChatParticipants.module.css";

import QuickChatParticipant from "./QuickChatParticipant";

import { useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../auth/authSlice";

const mockParticipants: string[] = [
    "user 1",
    "user 2",
    "user 3",
    "user 4",
    "user 5",
    "user 6",
    "user 7",
];

function QuickChatParticipants() {

    const username = useAppSelector(selectUsername);

    const participants = mockParticipants.map(name => {
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