import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface QuickChatState {
    roomId: string;
    messages: any[];
}

const initialState: QuickChatState = {
    roomId: "",
    messages: []
}

const quickChatSlice = createSlice({
    name: 'quickChat',
    initialState,
    reducers: {
        setRoomId: (state, action: PayloadAction<string>) => {
            state.roomId = action.payload;
        }
    }
})

export const { setRoomId } = quickChatSlice.actions;

export default quickChatSlice.reducer;

export const selectRoomId = (state: RootState) => state.quickChat.roomId;