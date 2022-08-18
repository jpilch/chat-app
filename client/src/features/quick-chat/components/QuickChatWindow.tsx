import styles from './QuickChatWindow.module.css';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';

import _ from 'lodash';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useSocket } from '../../chat/hooks';

import { handleIncomingMessage, selectMessages, selectRoomId } from '../state/quickChatSlice';
import { selectUsername } from '../../auth/authSlice';

import { QuickMessage, SEND_MESSAGE_EVENT } from '../types';

import QuickChatMessage from './QuickChatMessage';

function QuickChatWindow(): JSX.Element {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string>("");

    const roomId = useAppSelector(selectRoomId);
    const username = useAppSelector(selectUsername);
    const messages = useAppSelector(selectMessages);

    const bottomRef = useRef<HTMLDivElement>(null);

    const socket = useSocket();

    useEffect(() => {
        socket.on(SEND_MESSAGE_EVENT, (data: QuickMessage) => {
            dispatch(handleIncomingMessage(data))
        })
    }, [])

    useLayoutEffect(() => {
        bottomRef.current!.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className={styles.window} >
            <div className={styles.window__info}>
                <p className="window__name">Room ID: {roomId}</p>
            </div>
            <div className={styles.window__messages} >
                {messages.map((message, index) => (
                    <QuickChatMessage
                        message={message}
                        byCurrentUser={username === message.author}
                        key={_.uniqueId(message.author)}
                    />
                ))}
                <div className="last" ref={bottomRef}></div>
            </div >
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
                        socket.emit(SEND_MESSAGE_EVENT, { author: username, content: message, roomId });
                        setMessage('');
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default QuickChatWindow