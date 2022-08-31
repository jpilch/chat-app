import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { localStorageGet } from "../../common/utils";
import { loginRequiredNotification, loginSuccessfulNotification } from "../../notification/state";
import { AuthState, setAuthState } from "../state/authSlice";

export function useLocalStorageAuth() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const localStorageAuth = useCallback((isAuthenticated: boolean = false) => {
        if (!isAuthenticated) {
            try {
                const { username, token } = localStorageGet(
                    import.meta.env.VITE_USER_AUTH_DATA
                ) as Partial<AuthState>;
                if (!username || !token) throw new Error();
                dispatch(setAuthState({ username, token }));
                dispatch(loginSuccessfulNotification());
            } catch (error) {
                dispatch(loginRequiredNotification());
                navigate("/");
            }
        }
    }, []);

    return localStorageAuth;
}
