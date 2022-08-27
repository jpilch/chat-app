import { IQuickChatService } from "../types/IQuickChatService";

import { useSocket } from "../../chat/hooks";
import { QuickMessage, } from "../types";
import { QC_USER_TYPING_EVENT, QC_SEND_MESSAGE_EVENT, QC_USER_JOINED_EVENT, QC_FETCH_PARTICIPANTS_EVENT, QC_USER_LEFT_EVENT } from "../constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addParticipant, handleIncomingMessage, selectRoomId, setUserTypingAction, setUserNotTypingAction, setUserTimeoutId, setParticipants, removeParticipant } from "../state/quickChatSlice";
import { selectUsername } from "../../auth/authSlice";
import { useCallback } from "react";

export function useQuickChatService(): IQuickChatService {
    const dispatch = useAppDispatch();
    const username = useAppSelector(selectUsername);
    const roomId = useAppSelector(selectRoomId);
    const socket = useSocket();

    const registerListeners = useCallback(() => {
        socket.on(QC_SEND_MESSAGE_EVENT, (data: QuickMessage) => {
            dispatch(handleIncomingMessage(data));
        });
        socket.on(QC_USER_JOINED_EVENT, ({ username }: { username: string }) => {
            dispatch(addParticipant({ username, isTyping: false, timeoutId: null }));
        });
        socket.on(QC_FETCH_PARTICIPANTS_EVENT, (participants: string[]) => {
            dispatch(setParticipants(participants));
        });
        socket.on(QC_USER_TYPING_EVENT, (username: string) => {
            dispatch(setUserTypingAction(username));
            const timeoutId = setTimeout(() => dispatch(setUserNotTypingAction(username)), 1500);
            dispatch(setUserTimeoutId({ username, timeoutId }));
        });
        socket.on(QC_USER_LEFT_EVENT, (username: string) => {
            dispatch(removeParticipant(username));
        });
    }, []);

    const clearListeners = useCallback(() => {
        socket.off(QC_SEND_MESSAGE_EVENT);
        socket.off(QC_USER_JOINED_EVENT);
    }, []);

    const sendMessage = useCallback((message: string) => {
        socket.emit(QC_SEND_MESSAGE_EVENT, {
            author: username,
            content: message,
            roomId
        });
    }, []);

    const setUserTyping = useCallback(() => {
        socket.emit(QC_USER_TYPING_EVENT, {
            username,
            roomId
        });
    }, []);

    const getRoomId = useCallback(() => {
        return roomId;
    }, []);

    const getUsername = useCallback(() => {
        return username;
    }, []);

    return {
        registerListeners,
        clearListeners,
        setUserTyping,
        sendMessage,
        getUsername,
        getRoomId
    };
}

export default useQuickChatService;