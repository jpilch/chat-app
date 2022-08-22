import { IQuickChatService } from "../types/IQuickChatService";

import { useSocket } from "../../chat/hooks";
import { QuickMessage, } from "../types";
import { USER_TYPING_EVENT, SEND_MESSAGE_EVENT, USER_JOINED_EVENT, FETCH_PARTICIPANTS_EVENT } from '../constants';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addParticipant, handleIncomingMessage, selectRoomId, setUserTypingAction, setUserNotTypingAction, setUserTimeoutId, setParticipants } from "../state/quickChatSlice";
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
            dispatch(addParticipant({ username, isTyping: false, timeoutId: null }));
        });
        socket.on(FETCH_PARTICIPANTS_EVENT, (participants: string[]) => {
            dispatch(setParticipants(participants));
        });
        socket.on(USER_TYPING_EVENT, (username: string) => {
            dispatch(setUserTypingAction(username));
            let timeoutId = setTimeout(() => dispatch(setUserNotTypingAction(username)), 1500)
            dispatch(setUserTimeoutId({ username, timeoutId }))
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

    const setUserTyping = useCallback(() => {
        socket.emit(USER_TYPING_EVENT, {
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