import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { instance } from "../../common/axios";
import { RequestStatus } from "../../common/types";
import { UserConversation } from "../types";

type ConversationState = {
    conversations: UserConversation[],
    status: RequestStatus
}

const initialState: ConversationState = {
    conversations: [],
    status: RequestStatus.idle
}

export const fetchUserConversations = createAsyncThunk<UserConversation[], null, { state: RootState }>(
    "conversations/fetchUserConversations",
    async (_, { getState }) => {
        const { token } = getState().auth;
        const response = await instance.get<UserConversation[]>("/users/me/conversations", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
)

export const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserConversations.pending, (state, _action) => {
                state.status = RequestStatus.pending;
            })
            .addCase(fetchUserConversations.fulfilled, (state, action: PayloadAction<UserConversation[]>) => {
                state.conversations = action.payload;
                state.status = RequestStatus.fullfilled;
            })
    }
})

export const selectConversations = (state: RootState) => state.conversations.conversations;

export const selectConversationsStatus = (state: RootState) => state.conversations.status;

export default conversationSlice.reducer;