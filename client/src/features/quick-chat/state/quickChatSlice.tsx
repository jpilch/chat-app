import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { QuickMessage, Participant } from "../types";

interface QuickChatState {
    roomId: string;
    messages: QuickMessage[];
    participants: Participant[];
}

const initialState: QuickChatState = {
    roomId: "",
    messages: [],
    participants: []
};

const quickChatSlice = createSlice({
    name: "quickChat",
    initialState,
    reducers: {
        chooseRoomId: (state, action: PayloadAction<string>) => {
            state.roomId = action.payload;
        },
        handleIncomingMessage: (state, action: PayloadAction<QuickMessage>) => {
            state.messages.push(action.payload);
        },
        setParticipants: (state, action: PayloadAction<string[]>) => {
            state.participants = action.payload.map(p => ({
                username: p, isTyping: false, timeoutId: null
            }));
        },
        addParticipant: (state, action: PayloadAction<Participant>) => {
            state.participants.push(action.payload);
        },
        removeParticipant: (state, action: PayloadAction<string>) => {
            state.participants = state.participants.filter(p => (
                p.username !== action.payload
            ));
        },
        setUserTypingAction: (state, action: PayloadAction<string>) => {
            let participant = state.participants.find(p => (
                p.username === action.payload
            ));
            if (participant!.timeoutId) clearTimeout(participant!.timeoutId);
            participant!.isTyping = true;
        },
        setUserNotTypingAction: (state, action: PayloadAction<string>) => {
            let participant = state.participants.find(p => (
                p.username === action.payload
            ));
            participant!.isTyping = false;
        },
        setUserTimeoutId: (state, action: PayloadAction<{ username: string, timeoutId: number }>) => {
            let participant = state.participants.find(p => (
                p.username === action.payload.username
            ));
            participant!.timeoutId = action.payload.timeoutId;
        },
    }
});

export const {
    chooseRoomId,
    handleIncomingMessage,
    addParticipant,
    setUserTypingAction,
    setUserNotTypingAction,
    setUserTimeoutId,
    setParticipants,
    removeParticipant
} = quickChatSlice.actions;

export default quickChatSlice.reducer;

export const selectRoomId = (state: RootState) => state.quickChat.roomId;

export const selectMessages = (state: RootState) => state.quickChat.messages;

export const selectParticipants = (state: RootState) => state.quickChat.participants;