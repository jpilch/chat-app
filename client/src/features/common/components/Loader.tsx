import styles from "./Loader.module.css"

import { Oval } from 'react-loader-spinner'

function Loader() {
    return (
        <div className={styles.container}>
            <Oval
                height={80}
                width={80}
                color="var(--text-color-primary)"
                visible={true}
                ariaLabel='oval-loading'
                strokeWidth={4}
                strokeWidthSecondary={2}
            />
        </div>
    )
}

export default Loader;