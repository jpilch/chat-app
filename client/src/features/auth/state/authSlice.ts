import { Action, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginCredentials } from "../types";
import axios from "axios";
import { RootState } from "../../app/store";
import { RequestStatus } from "../../common/types";
import { localStorageSet } from "../../common/utils";
import { instance } from "../../common/axios";

type AuthState = {
    username: string | null,
    token: string | null,
    status: RequestStatus
}

const initialState: AuthState = {
    username: null,
    token: null,
    status: RequestStatus.idle
}

export const login = createAsyncThunk(
    "auth/login",
    async (credentials: LoginCredentials) => {
        const response = await instance.post("/auth/login", credentials);
        return response.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state, _action) => {
                state.status = RequestStatus.pending;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<Partial<AuthState>>) => {
                state.status = RequestStatus.fullfilled;
                /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                state.token = action.payload.token!;
                /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                state.username = action.payload.username!;
                localStorageSet(import.meta.env.VITE_USER_AUTH_DATA, action.payload);
            })
            .addCase(login.rejected, (state, _action) => {
                state.status = RequestStatus.rejected;
            })
    }
});

export const { setUsername, setToken } = authSlice.actions;

export const selectAuthStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;