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
    messages: [
        { author: "user 1", content: "Hi all!" },
        { author: "user 2", content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus eaque consectetur quos eos quis, sequi necessitatibus inventore temporibus ipsa rem!" },
        { author: "user 3", content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Magnam, natus.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur repudiandae eos ut, esse repellendus maxime odio voluptas. Atque nesciunt aliquid voluptatibus dolorem corrupti saepe, animi quae sunt illum iste. Quam unde dignissimos placeat omnis assumenda quo saepe harum commodi excepturi accusantium iste, reiciendis nesciunt veniam " }
    ],
    participants: [
        { username: "user 1", isTyping: false, timeoutId: null },
        { username: "user 2", isTyping: false, timeoutId: null },
        { username: "user 3", isTyping: false, timeoutId: null },
        { username: "user 4", isTyping: false, timeoutId: null },
    ]
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
    setParticipants
} = quickChatSlice.actions;

export default quickChatSlice.reducer;

export const selectRoomId = (state: RootState) => state.quickChat.roomId;

export const selectMessages = (state: RootState) => state.quickChat.messages;

export const selectParticipants = (state: RootState) => state.quickChat.participants;