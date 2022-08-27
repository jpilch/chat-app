
export interface ServerToClientEvents {
    QC_SEND_MESSAGE: ({ author, content }: { author: string, content: string }) => void;
    QC_USER_JOINED: ({ username }: { username: string }) => void;
    QC_USER_TYPING: ({ username, roomId }: { username: string, roomId: string }) => void;
    QC_FETCH_PARTICIPANTS: (participants: string[]) => void;
    QC_USER_LEFT: (username: string) => void;
}

export interface ClientToServerEvents {
    QC_JOIN: ({ username, roomId }: { username: string, roomId: string }) => void;
    QC_SEND_MESSAGE: ({ author, content, roomId }: { author: string, content: string, roomId: string }) => void;
    QC_USER_TYPING: ({ username, roomId }: { username: string, roomId: string }) => void;
}

export interface InterServerEvents {
    PING: () => void;
}

export interface SocketData {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    data: any
}

export const QC_SEND_MESSAGE_EVENT = "QC_SEND_MESSAGE";
export const QC_JOIN_EVENT = "QC_JOIN";
export const QC_USER_JOINED_EVENT = "QC_USER_JOINED";
export const QC_USER_TYPING_EVENT = "QC_USER_TYPING";
export const QC_FETCH_PARTICIPANTS_EVENT = "QC_FETCH_PARTICIPANTS";
export const QC_USER_LEFT_EVENT = "QC_USER_LEFT";