import { configureStore } from "@reduxjs/toolkit";

import authFormSlice from "../auth/state/authFormSlice";
import authSlice from "../auth/state/authSlice";

/* quick chat state */
import quickAuthSlice from "../quick-auth/authSlice";
import quickChatSlice from "../quick-chat/state/quickChatSlice";

export const store = configureStore({
    reducer: {
        quickAuth: quickAuthSlice,
        quickChat: quickChatSlice,
        authForm: authFormSlice,
        auth: authSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;