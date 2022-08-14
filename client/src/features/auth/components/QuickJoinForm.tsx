import styles from './AuthForm.module.css';

import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../constants';

function QuickJoinForm() {
    const navigate = useNavigate();

    return (
        <>
            <form className={styles.auth__form}>
                <input
                    type="text"
                    className={styles.auth__input}
                    id='username'
                    placeholder='Username'
                    autoComplete='off'
                />
                <input
                    type="text"
                    className={styles.auth__input}
                    id='room-id'
                    placeholder='Room ID'
                    autoComplete='off'
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