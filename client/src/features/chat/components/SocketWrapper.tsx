import { useEffect } from "react";
import { useChatService } from "../hooks";

function SocketWrapper({ children }: { children: JSX.Element }) {

    const chatService = useChatService();

    useEffect(() => {
        chatService.connect();
        return () => chatService.disconnect();
    }, [])

    return <>{children}</>
}

export default SocketWrapper