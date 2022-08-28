import SignupForm from "../components/SignupForm";
import LoginForm from "../../auth/components/LoginForm";
import QuickJoinForm from "../../quick-auth/components/QuickJoinForm";
import { useAppSelector } from "../../app/hooks";
import { selectAuthForm } from "../state";

import { Form } from "../state";

export function useAuthForm(): JSX.Element {

    const authForm = useAppSelector(selectAuthForm);

    function getFormByPathname(authForm: Form): JSX.Element {
        switch (authForm) {
            case Form.Register:
                return <SignupForm />;
            case Form.Login:
                return <LoginForm />;
            case Form.QuickJoin:
                return <QuickJoinForm />;
            default:
                throw new Error(`Cannot get auth form`);
        }
    }

    return getFormByPathname(authForm);
}

export default useAuthForm;