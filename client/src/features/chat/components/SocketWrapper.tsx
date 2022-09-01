import { useEffect } from "react";
import { useAuthStatus } from "../../auth/hooks";
import { ChatSocket } from "../socket";

function SocketWrapper() {
    const isAuthenticated = useAuthStatus();

    useEffect(() => {
        if (isAuthenticated) ChatSocket.getInstance();
        return () => ChatSocket.getInstance().disconnect();
    }, [])

    return (
        <div>SocketWrapper</div>
    )
}

export default SocketWrapper