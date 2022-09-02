import { useEffect } from "react";
import { useChatService } from "../hooks";

function SocketWrapper() {

    const chatService = useChatService();

    useEffect(() => {
        chatService.connect();
        return () => chatService.disconnect();
    }, [])

    return (
        <div>SocketWrapper</div>
    )
}

export default SocketWrapper