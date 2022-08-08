import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface AuthState {
    username: string;
}

const initialState: AuthState = {
    username: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }
    }
});

export const { setUsername } = authSlice.actions;

export const selectUsername = (state: RootState) => state.auth.username;

export default authSlice.reducer;