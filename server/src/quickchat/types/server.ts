export interface QCServerToClientEvents {
    QC_SEND_MESSAGE: ({ author, content }: { author: string, content: string }) => void;
    QC_USER_JOINED: ({ username }: { username: string }) => void;
    QC_USER_TYPING: ({ username, roomId }: { username: string, roomId: string }) => void;
    QC_FETCH_PARTICIPANTS: (participants: string[]) => void;
    QC_USER_LEFT: (username: string) => void;
}

export interface QCClientToServerEvents {
    QC_JOIN: ({ username, roomId }: { username: string, roomId: string }) => void;
    QC_SEND_MESSAGE: ({ author, content, roomId }: { author: string, content: string, roomId: string }) => void;
    QC_USER_TYPING: ({ username, roomId }: { username: string, roomId: string }) => void;
}

export interface QCInterServerEvents {
    PING: () => void;
}

export interface QCSocketData {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    data: any
}