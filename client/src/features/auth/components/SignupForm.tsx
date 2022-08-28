import styles from "./AuthForm.module.css";

import { useAppDispatch } from "../../app/hooks";
import { setAuthForm } from "../state";
import { Form } from "../state"



function SignUpForm() {
    const dispatch = useAppDispatch();

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
                    onClick={() => dispatch(setAuthForm(Form.Login))}
                >
                    Login
                </button>
            </form>
            <p className={styles.auth__skip_paragraph}>
                In a hurry? Try out {" "}
                <span
                    className={styles.auth__skip_link}
                    onClick={() => dispatch(setAuthForm(Form.QuickJoin))}
                >
                    Quick Chat
                </span>
            </p>
        </>
    );
}

export default SignUpForm;