import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Loader from '../../common/components/Loader';
import { localStorageGet } from '../../common/utils';
import { loginRequiredNotification, loginSuccessfulNotification } from '../../notification/state/notificationSlice';
import { AuthState, selectToken, selectUsername, setAuthState } from '../state/authSlice'

function AuthWrapper({ children }: { children: JSX.Element }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const token = useAppSelector(selectToken);
    const username = useAppSelector(selectUsername);

    const isAuthenticated: boolean = (token != null && username != null);

    const localStorageAuth = useCallback(() => {
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

    /* credentials are not set in state, try to retreive them from local storage */
    useEffect(() => {
        /* keep the loader spinning for 1 sec */
        let timeoutId = setTimeout(localStorageAuth, 1000);
        return () => clearTimeout(timeoutId);
    }, [isAuthenticated]);

    /* credentials are set in state - user logged in manually */
    if (isAuthenticated) return <>{children}</>;

    return <Loader />;
};

export default AuthWrapper

