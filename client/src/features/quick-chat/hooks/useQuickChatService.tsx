import { IQuickChatService } from "../types/IQuickChatService";

import { useSocket } from "../../chat/hooks";
import { QuickMessage, SEND_MESSAGE_EVENT, USER_JOINED_EVENT } from "../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addParticipant, handleIncomingMessage, selectRoomId } from "../state/quickChatSlice";
import { selectUsername } from "../../auth/authSlice";
import { useCallback } from "react";

export function useQuickChatService(): IQuickChatService {
    const dispatch = useAppDispatch();
    const username = useAppSelector(selectUsername);
    const roomId = useAppSelector(selectRoomId);
    const socket = useSocket();

    const registerListeners = useCallback(() => {
        socket.on(SEND_MESSAGE_EVENT, (data: QuickMessage) => {
            dispatch(handleIncomingMessage(data));
        });
        socket.on(USER_JOINED_EVENT, ({ username }: { username: string }) => {
            dispatch(addParticipant(username));
        });
    }, []);

    const clearListeners = useCallback(() => {
        socket.off(SEND_MESSAGE_EVENT);
        socket.off(USER_JOINED_EVENT);
    }, []);

    const sendMessage = useCallback((message: string) => {
        socket.emit(SEND_MESSAGE_EVENT, {
            author: username,
            content: message,
            roomId
        });
    }, []);

    const getRoomId = useCallback(() => {
        return roomId;
    }, []);

    return {
        registerListeners,
        clearListeners,
        sendMessage,
        getRoomId
    };
}

export default useQuickChatService;