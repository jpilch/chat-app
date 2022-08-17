import styles from './QuickChatMessage.module.css'

import { QuickMessage } from '../types';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUsername } from '../../auth/authSlice';
import { useEffect, useRef } from 'react';

function QuickChatMessage({
    message,
    byCurrentUser,
    last
}: {
    message: QuickMessage,
    byCurrentUser: boolean,
    last: boolean
}) {
    const dispatch = useAppDispatch();
    const messageRef = useRef<HTMLDivElement>(null)

    let author: string = byCurrentUser
        ? 'You'
        : message.author;

    let contentClass: string = byCurrentUser
        ? `${styles.message__content} ${styles['message__content--current']}`
        : styles.message__content;

    return (
        <div className={styles.message}>
            <p className={styles.message__author}>
                {author}:
            </p>
            <p className={contentClass}>
                {message.content}
            </p>
        </div>
    )
}

export default QuickChatMessage