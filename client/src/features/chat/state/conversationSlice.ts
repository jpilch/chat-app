import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { instance } from "../../common/axios";

type ConversationState = {
    conversations: []
}

const initialState: ConversationState = {
    conversations: []
}

export const fetchUserConversations = createAsyncThunk<any, null, { state: RootState }>(
    "conversations/fetchUserConversations",
    async (_, { getState }) => {
        const { token } = getState().auth;
        console.log({ token })
        const response = await instance.get("/users/me/conversations", {
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

    }
})

export default conversationSlice.reducer;