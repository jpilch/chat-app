import { configureStore } from "@reduxjs/toolkit";
import authFormSlice from "../auth/state/authFormSlice";
import authSlice from "../quick-auth/authSlice";
import quickChatSlice from "../quick-chat/state/quickChatSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        quickChat: quickChatSlice,
        authForm: authFormSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;