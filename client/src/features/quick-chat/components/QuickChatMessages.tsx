import { useLayoutEffect, useRef } from "react";
import uniqueId from "lodash/uniqueId";
import QuickChatMessage from "./QuickChatMessage";
import { useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../auth/authSlice";
import { selectMessages } from "../state/quickChatSlice";

function QuickChatMessages() {
    const username = useAppSelector(selectUsername);
    const messages = useAppSelector(selectMessages);

    const bottomRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        bottomRef.current!.scrollIntoView();
    }, [messages]);

    return (
        <>
            {messages.map((message) => (
                <QuickChatMessage
                    message={message}
                    byCurrentUser={username === message.author}
                    key={uniqueId(message.author)}
                />
            ))}
            <div ref={bottomRef}></div>
        </>
    );
}

export default QuickChatMessages;