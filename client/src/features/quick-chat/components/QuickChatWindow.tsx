import { useState } from 'react';
import { QuickMessage } from '../types';
import { useAppSelector } from '../../app/hooks';

import styles from './QuickChatWindow.module.css';
import { selectRoomId } from '../state/quickChatSlice';

function QuickChatMessage({ message }: { message: QuickMessage }) {
    return (
        <div className="quick-message">
            <p className="message__content">
                <span className="message__author">
                    {message.author}: {" "}
                </span>
                {message.content}
            </p>
        </div>
    )
}

function QuickChatWindow() {
    const roomId = useAppSelector(selectRoomId);

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<QuickMessage[]>([
        { author: 'user 1', content: 'Hi all!' },
        { author: 'user 1', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus eaque consectetur quos eos quis, sequi necessitatibus inventore temporibus ipsa rem!' },
        { author: 'user 1', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Magnam, natus.' }
    ]);


    return (
        <div className={styles.window}>
            <div className={styles.window__info}>
                <p className="window__name">Room ID: {roomId}</p>
            </div>
            <div className={styles.window__messages}>
                {messages.map(message => (
                    <QuickChatMessage
                        message={message}
                        key={message.content}
                    />
                ))}
            </div>
            <div className={styles.window__send}>
                <input
                    type="text"
                    placeholder='Message'
                    className={styles.window__input}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button
                    className={`${styles.window__button} ${styles['window__button--submit']}`}
                    onClick={() => {
                        console.log(message);
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default QuickChatWindow