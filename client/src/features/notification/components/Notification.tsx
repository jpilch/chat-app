import styles from "./Notification.module.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { hideNotification, NotificationStatus, selectMessage, selectNotificationBarWidth, selectNotificationClassModifier, selectNotificationStatus, setMessage, setNotificationStatus, setTimeoutId, showNotification } from "../state/notificationSlice"
import classNames from "classnames";
import { useCallback, useEffect } from "react";

const getNotificationBarClassModifier = (status: NotificationStatus): string => {
    switch (status) {
        case NotificationStatus.success:
        case NotificationStatus.idle:
            return styles["notification__bar--success"];
        case NotificationStatus.warning:
            return styles["notification__bar--warning"];
        case NotificationStatus.failure:
            return styles["notification__bar--failure"];
        default:
            throw new Error(
                `Cannot get class name for notification status: ${status}`);
    }
};

function Notification() {
    const notificationClassModifier = useAppSelector(selectNotificationClassModifier)
    const notificationStatus = useAppSelector(selectNotificationStatus);
    const notificationBarWidth = useAppSelector(selectNotificationBarWidth);
    const message = useAppSelector(selectMessage);

    const dispatch = useAppDispatch();

    const closeNotification = useCallback(() => {
        dispatch(hideNotification(null));
        dispatch(setTimeoutId(
            setTimeout(() => {
                dispatch(setNotificationStatus(NotificationStatus.idle))
                dispatch(setMessage(null));
            }, 1000)
        ))
    }, [])

    useEffect(() => {
        if (Math.floor(notificationBarWidth) >= 100) closeNotification();
    }, [notificationBarWidth])

    return (
        <div className={classNames(
            styles.notification,
            notificationClassModifier
        )}>
            <p>
                {message}
            </p>
            <img
                src="src/assets/close.png"
                alt="close icon"
                className={styles.notification__close_icon}
                width="12"
                height="12"
                onClick={closeNotification}
            />
            <div className={
                classNames(
                    styles.notification__bar,
                    getNotificationBarClassModifier(notificationStatus)
                )}
                style={{ "width": `${notificationBarWidth}%` }}
            />
        </div>
    )
}

export default Notification