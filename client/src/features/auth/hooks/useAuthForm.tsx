import { useLocation } from "react-router-dom";

import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

import { LOGIN_URL } from "../constants";

export function useAuthForm() {
    const location = useLocation();

    const form = location.pathname === LOGIN_URL
        ? <LoginForm />
        : <SignupForm />

    return form;
}

export default useAuthForm;