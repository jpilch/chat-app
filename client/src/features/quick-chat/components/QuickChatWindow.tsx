import styles from "./QuickChatWindow.module.css";

import { FormEvent, useEffect, useState } from "react";

import classNames from "classnames";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useSocket } from "../../chat/hooks";

import { addParticipant, handleIncomingMessage, selectRoomId } from "../state/quickChatSlice";

import { QuickMessage, SEND_MESSAGE_EVENT, USER_JOINED_EVENT } from "../types";

import QuickChatMessages from "./QuickChatMessages";
import { selectUsername } from "../../auth/authSlice";

function QuickChatWindow(): JSX.Element {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string>("");

    const roomId = useAppSelector(selectRoomId);
    const username = useAppSelector(selectUsername)

    const socket = useSocket();

    useEffect(() => {
        socket.on(SEND_MESSAGE_EVENT, (data: QuickMessage) => {
            dispatch(handleIncomingMessage(data));
        });
        socket.on(USER_JOINED_EVENT, ({ username }: { username: string }) => {
            dispatch(addParticipant(username));
        })
    }, []);

    return (
        <div className={styles.window} >
            <div className={styles.window__info}>
                <p>Room ID: {roomId}</p>
            </div>
            <div className={styles.window__messages} >
                <QuickChatMessages />
            </div >
            <form
                className={styles.window__send}
                onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    socket.emit(SEND_MESSAGE_EVENT, { author: username, content: message, roomId });
                    setMessage("");
                }}
            >
                <input
                    required
                    type="text"
                    placeholder='Message'
                    className={styles.window__input}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className={classNames(styles.window__button, styles["window__button--submit"])}
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default QuickChatWindow;