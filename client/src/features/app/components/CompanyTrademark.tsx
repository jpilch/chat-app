import styles from "./CompanyTrademark.module.css";

function CompanyTrademark() {
    return (
        <div className={styles.trademark}>
            <div className={styles.trademark__logo}>
                <h1 className={styles.trademark__name}>Comms</h1>
                {/* <img src="/src/assets/logo-500x500.png" alt="company logo" className={styles.trademark__img} /> */}
            </div>
            <p className={styles.trademark__heading}>Real time chatting has never been easier</p>
        </div>
    );
}

export default CompanyTrademark;