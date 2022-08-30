import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface AuthState {
    username: string;
}

const initialState: AuthState = {
    username: "",
};

const quickAuthSlice = createSlice({
    name: "quickAuth",
    initialState,
    reducers: {
        chooseUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }
    }
});

export const { chooseUsername } = quickAuthSlice.actions;

export const selectUsername = (state: RootState) => state.quickAuth.username;

export default quickAuthSlice.reducer;