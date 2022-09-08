import styles from "./Chat.module.css";

import AuthWrapper from '../../auth/components/AuthWrapper'
import SocketWrapper from '../components/SocketWrapper';

import {
    Window,
    Contacts,
    Controls
} from '../components';

function Chat() {
    return (
        <AuthWrapper>
            <SocketWrapper>
                <main className={styles.chat}>
                    <Controls />
                    <Contacts />
                    <Window />
                </main>
            </SocketWrapper>
        </AuthWrapper>
    )
}

export default Chat