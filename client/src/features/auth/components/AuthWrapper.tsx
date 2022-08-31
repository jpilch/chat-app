import { useEffect } from 'react';
import Loader from '../../common/components/Loader';
import { useAuthStatus } from '../hooks';
import { useLocalStorageAuth } from '../hooks/useLocalStorageAuth';

function AuthWrapper({ children }: { children: JSX.Element }) {

    const isAuthenticated = useAuthStatus();
    const localStorageAuth = useLocalStorageAuth();

    useEffect(() => {
        /* credentials are not set in state, try to retreive them from local storage */
        if (!isAuthenticated) {
            /* keep the loader spinning for 1 sec */
            let timeoutId = setTimeout(localStorageAuth, 1000);
            return () => clearTimeout(timeoutId);
        };
    }, [isAuthenticated]);

    /* credentials are set in state - user logged in manually */
    if (isAuthenticated) return <>{children}</>;

    return <Loader />;
};

export default AuthWrapper

