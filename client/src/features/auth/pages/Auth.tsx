import styles from './Auth.module.css'

import CompanyTrademark from '../../app/components/CompanyTrademark';

import useAuthForm from '../hooks/useAuthForm';

function Auth() {
    const form = useAuthForm();

    return (
        <main className={styles.auth}>
            <section className={styles.auth__logo}>
                <CompanyTrademark />
            </section>
            <section className={styles.auth__form}>
                {form}
            </section>
        </main>
    )
}

export default Auth