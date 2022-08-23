import { useLayoutEffect, useRef } from "react";
import uniqueId from "lodash/uniqueId";
import QuickChatMessage from "./QuickChatMessage";
import { useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../auth/authSlice";
import { selectMessages } from "../state/quickChatSlice";
import QuickChatMessageGroup from "./QuickChatMessageGroup";
import { groupMessages } from "../utils";

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
            {groupMessages(messages).map((messageGroup) => (
                <QuickChatMessageGroup
                    messageGroup={messageGroup}
                    byCurrentUser={messageGroup.author === username}
                    key={uniqueId(messageGroup.author)}
                />
            ))}
            <div ref={bottomRef}></div>
        </>
    );
}

export default QuickChatMessages;