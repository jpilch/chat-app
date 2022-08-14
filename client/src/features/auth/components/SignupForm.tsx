import { useNavigate } from 'react-router-dom';

import { LOGIN_URL } from '../constants';

import styles from './AuthForm.module.css';

function SignUpForm() {
    const navigate = useNavigate();
    return (
        <>
            <form className={styles.auth__form}>
                <input
                    type="text"
                    className={styles.auth__input}
                    id='email'
                    placeholder='Email address'
                    autoComplete='off'
                />
                <input
                    type="text"
                    className={styles.auth__input}
                    id='username'
                    placeholder='Username'
                    autoComplete='off'
                />
                <input
                    type="password"
                    className={styles.auth__input}
                    id='password'
                    placeholder='Password'
                    autoComplete='off'
                />
                <input
                    type="password"
                    className={styles.auth__input}
                    id='password-confirm'
                    placeholder='Repeat password'
                    autoComplete='off'
                />
                <button
                    className={`${styles.auth__button} ${styles["auth__button--submit"]}`}
                    type='submit'
                >
                    Sign up
                </button>
                <div className={styles.auth__rule} />
                <button
                    className={`${styles.auth__button} ${styles["auth__button--redirect"]}`}
                    type="button"
                    onClick={() => navigate(LOGIN_URL)}
                >
                    Login
                </button>
            </form>
            <p className={styles.auth__skip_paragraph}>
                In a hurry? Try out {" "}
                <span className={styles.auth__skip_link}>
                    Quick Chat
                </span>
            </p>
        </>
    );
}

export default SignUpForm;