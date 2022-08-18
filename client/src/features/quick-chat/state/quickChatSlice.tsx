import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { QuickMessage } from "../types";

interface QuickChatState {
    roomId: string;
    messages: QuickMessage[];
}

const initialState: QuickChatState = {
    roomId: "",
    messages: [
        { author: 'user 1', content: 'Hi all!' },
        { author: 'user 2', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus eaque consectetur quos eos quis, sequi necessitatibus inventore temporibus ipsa rem!' },
        { author: 'user 3', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Magnam, natus.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur repudiandae eos ut, esse repellendus maxime odio voluptas. Atque nesciunt aliquid voluptatibus dolorem corrupti saepe, animi quae sunt illum iste. Quam unde dignissimos placeat omnis assumenda quo saepe harum commodi excepturi accusantium iste, reiciendis nesciunt veniam ' }
    ]
}

const quickChatSlice = createSlice({
    name: 'quickChat',
    initialState,
    reducers: {
        chooseRoomId: (state, action: PayloadAction<string>) => {
            state.roomId = action.payload;
        },
        handleIncomingMessage: (state, action: PayloadAction<QuickMessage>) => {
            state.messages.push(action.payload);
        }
    }
})

export const { chooseRoomId, handleIncomingMessage } = quickChatSlice.actions;

export default quickChatSlice.reducer;

export const selectRoomId = (state: RootState) => state.quickChat.roomId;

export const selectMessages = (state: RootState) => state.quickChat.messages;