import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../../common/components/Loader';
import { localStorageGet, localStorageRemove } from '../../common/utils';
import { loginFailedNotification, loginRequiredNotification, loginSuccessfulNotification } from '../../notification/state';
import { useAuthStatus } from '../hooks';
import { AuthState, selectAuthStatus, setAuthState } from '../state/authSlice';
import jwtDecode from 'jwt-decode';
import { RequestStatus } from '../../common/types';
import { USER_AUTH_DATA } from '../../common/config';

function AuthWrapper({ children }: { children: JSX.Element | Array<JSX.Element> }) {

    const isAuthenticated = useAuthStatus();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loginReqestStatus = useAppSelector(selectAuthStatus);

    useEffect(() => {
        if (!isAuthenticated) {
            /* keep the loader spinning for 0.5 sec */
            let timeoutId = setTimeout(() => {
                /* credentials are not set in state, try to retreive them from local storage */
                if (!isAuthenticated) {
                    try {
                        const { token } = localStorageGet(USER_AUTH_DATA) as Partial<AuthState>;
                        const { username } = jwtDecode(token!) as Partial<AuthState>;
                        if (!username) throw new Error();
                        dispatch(setAuthState({ username, token }));
                        dispatch(loginSuccessfulNotification());
                    } catch (error) {
                        localStorageRemove(USER_AUTH_DATA);
                        loginReqestStatus === RequestStatus.idle
                            ? dispatch(loginRequiredNotification())
                            : dispatch(loginFailedNotification());
                        navigate("/");
                    }
                }
            }, 500);
            return () => clearTimeout(timeoutId);
        };
    }, [isAuthenticated]);

    /* credentials are set in state - user logged in */
    if (isAuthenticated) return <>{children}</>;

    return <Loader />;
};

export default AuthWrapper

