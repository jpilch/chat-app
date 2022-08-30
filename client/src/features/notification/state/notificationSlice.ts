import styles from "../components/Notification.module.css";

import { AnyAction, createSlice, Store } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ThunkAction } from "@reduxjs/toolkit";

export enum NotificationStatus {
    idle,
    success,
    warning,
    failure
}

type NotificationState = {
    message: string | null,
    status: NotificationStatus,
    intervalId: ReturnType<typeof setInterval> | null,
    timeoutId: ReturnType<typeof setTimeout> | null,
    notificationClassModifier: string,
    notificationBarWidth: number
}

const initialState: NotificationState = {
    message: "",
    status: NotificationStatus.idle,
    intervalId: null,
    timeoutId: null,
    notificationClassModifier: "",
    notificationBarWidth: 0
}

export const notify = (message: string, status: NotificationStatus): ThunkAction<void, RootState, unknown, AnyAction> => (
    async dispatch => {
        dispatch(clearIntervalId());
        dispatch(showNotification({ message, status }));
        dispatch(setIntervalId(
            setInterval(() => dispatch(increaseBarWidthBy(0.2)), 10)
        ))
    }
)

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<Partial<NotificationState>>) => {
            if (state.timeoutId) clearTimeout(state.timeoutId);
            state.timeoutId = null;
            state.notificationBarWidth = 0;
            state.notificationClassModifier = styles["notification--entering"];
            state.message = action.payload.message!;
            state.status = action.payload.status!;
        },
        hideNotification: (state, _action: PayloadAction<null>) => {
            state.notificationClassModifier = styles["notification--exiting"];
            if (state.intervalId) clearInterval(state.intervalId)
        },
        setIntervalId: (state, action: PayloadAction<number>) => {
            state.intervalId = action.payload;
        },
        increaseBarWidthBy: (state, action: PayloadAction<number>) => {
            state.notificationBarWidth += action.payload;
        },
        setTimeoutId: (state, action: PayloadAction<number>) => {
            state.timeoutId = action.payload;
        },
        setNotificationStatus: (state, action: PayloadAction<NotificationStatus>) => {
            state.status = action.payload
        },
        setMessage: (state, action: PayloadAction<string | null>) => {
            state.message = action.payload;
        },
        clearIntervalId: (state) => {
            if (state.intervalId) clearInterval(state.intervalId);
        }
    }
});

export const {
    showNotification,
    hideNotification,
    increaseBarWidthBy,
    setIntervalId,
    setTimeoutId,
    setNotificationStatus,
    setMessage,
    clearIntervalId
} = notificationSlice.actions;

export const selectMessage = (state: RootState) => state.notification.message;
export const selectNotificationStatus = (state: RootState) => state.notification.status;
export const selectNotificationClassModifier = (state: RootState) => state.notification.notificationClassModifier;
export const selectNotificationBarWidth = (state: RootState) => state.notification.notificationBarWidth;

export default notificationSlice.reducer;