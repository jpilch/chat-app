import styles from "./Auth.module.css";

import CompanyTrademark from "../../app/components/CompanyTrademark";

import useAuthForm from "../../auth/hooks/useAuthForm";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { localStorageGet } from "../../common/utils";
import { USER_AUTH_DATA } from "../../common/config";

function Auth() {
    const form = useAuthForm();

    const navigate = useNavigate();

    useEffect(() => {
        const savedAuthData = localStorageGet(USER_AUTH_DATA);
        if (savedAuthData) navigate("/chat");
    }, [])

    return (
        <main className={styles.auth}>
            <section className={styles.auth__logo}>
                <CompanyTrademark />
            </section>
            <section className={styles.auth__form}>
                {form}
            </section>
        </main>
    );
}

export default Auth;