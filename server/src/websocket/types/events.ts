
export interface ServerToClientEvents {
    SEND_MESSAGE: ({ author, content }: { author: string, content: string }) => void;
    USER_JOINED: ({ username }: { username: string }) => void;
    USER_TYPING: ({ username, roomId }: { username: string, roomId: string }) => void;
    FETCH_PARTICIPANTS: (participants: string[]) => void;
    USER_LEFT: (username: string) => void;
}

export interface ClientToServerEvents {
    QUICKCHAT_JOIN: ({ username, roomId }: { username: string, roomId: string }) => void;
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

export const SEND_MESSAGE_EVENT = "SEND_MESSAGE";
export const QUICKCHAT_JOIN_EVENT = "QUICKCHAT_JOIN";
export const USER_JOINED_EVENT = "USER_JOINED";
export const USER_TYPING_EVENT = "USER_TYPING";
export const FETCH_PARTICIPANTS_EVENT = "FETCH_PARTICIPANTS";
export const USER_LEFT_EVENT = "USER_LEFT";