import styles from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";

import { SIGNUP_URL, QUICKJOIN_URL } from "../constants";

function LoginForm() {
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
                    type="password"
                    className={styles.auth__input}
                    id='password'
                    placeholder='Password'
                    autoComplete='off'
                />
                <button
                    className={`${styles.auth__button} ${styles["auth__button--submit"]}`}
                    type='submit'
                >
                    Login
                </button>
                <div className={styles.auth__rule} />
                <button
                    className={`${styles.auth__button} ${styles["auth__button--redirect"]}`}
                    type="button"
                    onClick={() => navigate(SIGNUP_URL)}
                >
                    Sign up
                </button>
            </form>
            <p className={styles.auth__skip_paragraph}>
                In a hurry? Try out {" "}
                <span
                    className={styles.auth__skip_link}
                    onClick={() => navigate(QUICKJOIN_URL)}
                >
                    Quick Chat
                </span>
            </p>
        </>
    );
}

export default LoginForm;