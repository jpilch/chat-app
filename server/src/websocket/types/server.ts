export interface ServerToClientEvents {
    SEND_MESSAGE: ({ author, content }: { author: string, content: string }) => void;
    USER_JOINED: ({ username }: { username: string }) => void;
    USER_TYPING: ({ username, roomId }: { username: string, roomId: string }) => void;
    FETCH_PARTICIPANTS: (participants: string[]) => void;
    USER_LEFT: (username: string) => void;
}

export interface ClientToServerEvents {
    JOIN: ({ username, roomId }: { username: string, roomId: string }) => void;
    SEND_MESSAGE: ({ author, content, roomId }: { author: string, content: string, roomId: string }) => void;
    USER_TYPING: ({ username, roomId }: { username: string, roomId: string }) => void;
}

export interface InterServerEvents {
    PING: () => void;
}

export interface SocketData {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    data: any
}