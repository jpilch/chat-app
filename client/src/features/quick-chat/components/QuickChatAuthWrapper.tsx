import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../auth/authSlice";
import { QUICKJOIN_URL } from "../../auth/constants";
import { selectRoomId } from "../state/quickChatSlice";

function QuickChatAuthWrapper({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();
    const username = useAppSelector(selectUsername);
    const roomId = useAppSelector(selectRoomId);

    useEffect(() => {
        if (!username || !roomId) {
            navigate(QUICKJOIN_URL);
        }
    }, []);

    return (
        <>
            {children}
        </>
    )
}

export default QuickChatAuthWrapper