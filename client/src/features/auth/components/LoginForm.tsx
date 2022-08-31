import styles from "./AuthForm.module.css";

import { setAuthForm } from "../state";
import { Form } from "../state";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "../state/authSlice";
import { useNavigate } from "react-router-dom";

type LoginInputs = {
    username: string,
    password: string
}

function LoginForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm<LoginInputs>();
    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        dispatch(login(data));
        navigate("/chat");
    };

    return (
        <>
            <form
                className={styles.auth__form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={styles.auth__input_group}>
                    <input
                        type="text"
                        className={!errors.username
                            ? styles.auth__input
                            : styles["auth__input--error"]
                        }
                        id='username'
                        placeholder='Username'
                        autoComplete='off'
                        {...register("username", {
                            required: "Username is required",
                            maxLength: {
                                message: "Username must be at most 10 characters long",
                                value: 10
                            },
                            minLength: {
                                message: "Username must be at least 4 characters long",
                                value: 4
                            }
                        })}
                    />
                    {errors.username && <p className={styles.auth__error}>
                        {errors.username.message}
                    </p>}
                </div>
                <div className={styles.auth__input_group}>
                    <input
                        type="password"
                        className={!errors.password
                            ? styles.auth__input
                            : styles["auth__input--error"]
                        }
                        id='password'
                        placeholder='Password'
                        autoComplete='off'
                        {...register("password", {
                            required: "Password is requred",
                            minLength: {
                                message: "Password must be at least 8 characters long",
                                value: 8
                            }
                        })}
                    />
                    {errors.password && <p className={styles.auth__error}>
                        {errors.password.message}
                    </p>}
                </div>
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
                    onClick={() => dispatch(setAuthForm(Form.Register))}
                >
                    Sign up
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

export default LoginForm;