import styles from './AuthForm.module.css';

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { chooseUsername } from '../authSlice';
import { chooseRoomId } from '../../quick-chat/state/quickChatSlice';

import { LOGIN_URL } from '../constants';

function QuickJoinForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(chooseUsername(username));
        dispatch(chooseRoomId(roomId));
        setUsername('');
        setRoomId('');
    }

    const [username, setUsername] = useState<string>('');
    const [roomId, setRoomId] = useState<string>('');

    return (
        <>
            <form
                className={styles.auth__form}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className={styles.auth__input}
                    id='username'
                    placeholder='Username'
                    autoComplete='off'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    className={styles.auth__input}
                    id='room-id'
                    placeholder='Room ID'
                    autoComplete='off'
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                />
                <button
                    className={`${styles.auth__button} ${styles["auth__button--submit"]}`}
                    type='submit'
                >
                    Join
                </button>
            </form>
            <p className={styles.auth__skip_paragraph}>
                Have an account? {" "}
                <span
                    className={styles.auth__skip_link}
                    onClick={() => navigate(LOGIN_URL)}
                >
                    Login
                </span>
            </p>
        </>
    )
}

export default QuickJoinForm