import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../quick-auth/authSlice";
import { AUTH_URL } from "../../auth/constants";
import { selectRoomId } from "../state/quickChatSlice";
import { useQuickChatSocket } from "../hooks";
import { QC_JOIN_EVENT } from "../constants";

function QuickChatAuthWrapper({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();
    const username = useAppSelector(selectUsername);
    const roomId = useAppSelector(selectRoomId);
    const socket = useQuickChatSocket();

    useEffect(() => {
        if (!username || !roomId) {
            navigate(AUTH_URL);
            return;
        }
        socket.emit(QC_JOIN_EVENT, ({ username, roomId }));
    }, []);

    if (!username || !roomId) {
        return <>Forbidden</>;
    }

    return (
        <>
            {children}
        </>
    );
}

export default QuickChatAuthWrapper;