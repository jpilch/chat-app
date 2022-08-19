import styles from "./QuickChatWindow.module.css";

import { useEffect } from "react";

import QuickChatMessages from "./QuickChatMessages";
import QuickChatWindowInfo from "./QuickChatWindowInfo";
import useQuickChatService from "../hooks/useQuickChatService";
import QuickChatSendForm from "./QuickChatSendForm";

function QuickChatWindow(): JSX.Element {
    const quickChatService = useQuickChatService();

    useEffect(() => {
        quickChatService.registerListeners();
        return () => quickChatService.clearListeners();
    }, [quickChatService.registerListeners, quickChatService.clearListeners]);

    return (
        <div className={styles.window} >
            <div className={styles.window__info}>
                <QuickChatWindowInfo />
            </div>
            <div className={styles.window__messages} >
                <QuickChatMessages />
            </div >
            <QuickChatSendForm />
        </div>
    );
}

export default QuickChatWindow;