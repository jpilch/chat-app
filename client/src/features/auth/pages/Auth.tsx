import styles from './Auth.module.css'

import CompanyTrademark from '../../app/components/CompanyTrademark';
import AuthFormWrapper from "../components/AuthFormWrapper";
import SignUpForm from "../components/SignUpForm";

function Auth() {
    return (
        <main className={styles.auth}>
            <section className={styles.auth__logo}>
                <CompanyTrademark />
            </section>
            <section className={styles.auth__form}>
                <AuthFormWrapper>
                    <SignUpForm />
                </AuthFormWrapper>
            </section>
        </main>
    )
}

export default Auth