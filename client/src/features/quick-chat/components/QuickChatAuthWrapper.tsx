import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../auth/authSlice";
import { QUICKJOIN_URL } from "../../auth/constants";
import { selectRoomId } from "../state/quickChatSlice";
import { useSocket } from "../../chat/hooks/useSocket";
import { QUICKCHAT_JOIN_EVENT } from "../types";

function QuickChatAuthWrapper({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();
    const username = useAppSelector(selectUsername);
    const roomId = useAppSelector(selectRoomId);
    const socket = useSocket()

    useEffect(() => {
        if (!username || !roomId) {
            navigate(QUICKJOIN_URL);
            return;
        }
        socket.emit(QUICKCHAT_JOIN_EVENT, ({ username, roomId }));
    }, []);

    if (!username || !roomId) {
        return <>Forbidden</>
    }

    return (
        <>
            {children}
        </>
    )
}

export default QuickChatAuthWrapper