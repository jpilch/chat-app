import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../quick-auth/authSlice";
import quickChatSlice from "../quick-chat/state/quickChatSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        quickChat: quickChatSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;