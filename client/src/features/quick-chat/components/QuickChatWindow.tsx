import { useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks';

import styles from './QuickChatWindow.module.css';
import { selectRoomId } from '../state/quickChatSlice';

import QuickChatMessage from './QuickChatMessage';
import { QuickMessage } from '../types';
import { selectUsername } from '../../auth/authSlice';
import { useLayoutEffect } from 'react';

function QuickChatWindow() {
    const roomId = useAppSelector(selectRoomId);
    const username = useAppSelector(selectUsername);
    const bottomRef = useRef<HTMLDivElement>(null);

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<QuickMessage[]>([
        { author: 'user 1', content: 'Hi all!' },
        { author: 'user 2', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus eaque consectetur quos eos quis, sequi necessitatibus inventore temporibus ipsa rem!' },
        { author: 'user 3', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Magnam, natus.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur repudiandae eos ut, esse repellendus maxime odio voluptas. Atque nesciunt aliquid voluptatibus dolorem corrupti saepe, animi quae sunt illum iste. Quam unde dignissimos placeat omnis assumenda quo saepe harum commodi excepturi accusantium iste, reiciendis nesciunt veniam ' }
    ]);

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
                        last={index === messages.length - 1}
                        key={message.content}
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
                        setMessages(messages => (
                            [...messages, { author: username, content: message }]
                        ));
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