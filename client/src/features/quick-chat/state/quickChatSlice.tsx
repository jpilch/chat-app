import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { QuickMessage } from "../types";

interface QuickChatState {
    roomId: string;
    messages: QuickMessage[];
    participants: string[];
}

const initialState: QuickChatState = {
    roomId: "",
    messages: [
        { author: "user 1", content: "Hi all!" },
        { author: "user 2", content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus eaque consectetur quos eos quis, sequi necessitatibus inventore temporibus ipsa rem!" },
        { author: "user 3", content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Magnam, natus.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur repudiandae eos ut, esse repellendus maxime odio voluptas. Atque nesciunt aliquid voluptatibus dolorem corrupti saepe, animi quae sunt illum iste. Quam unde dignissimos placeat omnis assumenda quo saepe harum commodi excepturi accusantium iste, reiciendis nesciunt veniam " }
    ],
    participants: [
        "user 1",
        "user 2",
        "user 3",
        "user 4",
        "user 5",
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
        addParticipant: (state, action: PayloadAction<string>) => {
            state.participants.push(action.payload);
        }
    }
});

export const { chooseRoomId, handleIncomingMessage, addParticipant } = quickChatSlice.actions;

export default quickChatSlice.reducer;

export const selectRoomId = (state: RootState) => state.quickChat.roomId;

export const selectMessages = (state: RootState) => state.quickChat.messages;

export const selectParticipants = (state: RootState) => state.quickChat.participants;