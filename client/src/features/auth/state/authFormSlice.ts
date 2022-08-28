import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

export enum Form {
    Register,
    Login,
    QuickJoin
}

type AuthFormState = {
    authForm: Form
}

const initialState: AuthFormState = {
    authForm: Form.Login
}

const authFormSlice = createSlice({
    name: "authForm",
    initialState,
    reducers: {
        setAuthForm: (state, action: PayloadAction<Form>) => {
            state.authForm = action.payload;
        }
    }
})

export const { setAuthForm } = authFormSlice.actions;

export const selectAuthForm = (state: RootState) => state.authForm.authForm;

export default authFormSlice.reducer;