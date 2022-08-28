import { useLocation } from "react-router-dom";

import SignupForm from "../components/SignupForm";
import LoginForm from "../../auth/components/LoginForm";
import QuickJoinForm from "../../quick-auth/components/QuickJoinForm";

import { LOGIN_URL, QUICKJOIN_URL, SIGNUP_URL } from "../constants";

export function useAuthForm(): JSX.Element {
    const location = useLocation();

    function getFormByPathname(pathname: string): JSX.Element {
        switch (pathname) {
            case SIGNUP_URL:
                return <SignupForm />;
            case LOGIN_URL:
                return <LoginForm />;
            case QUICKJOIN_URL:
                return <QuickJoinForm />;
            default:
                throw new Error(`Cannot get auth form for pathname ${pathname}`);
        }
    }

    return getFormByPathname(location.pathname);
}

export default useAuthForm;