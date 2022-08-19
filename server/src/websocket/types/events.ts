
export interface ServerToClientEvents {
    SEND_MESSAGE: ({ author, content }: { author: string, content: string }) => void;
    USER_JOINED: ({ username }: { username: string }) => void;
}

export interface ClientToServerEvents {
    QUICKCHAT_JOIN: ({ username, roomId }: { username: string, roomId: string }) => void;
    SEND_MESSAGE: ({ author, content, roomId }: { author: string, content: string, roomId: string }) => void;
}

export interface InterServerEvents {
    PING: () => void;
}

export interface SocketData {
    data: any
}

export const SEND_MESSAGE_EVENT = "SEND_MESSAGE";
export const QUICKCHAT_JOIN_EVENT = "QUICKCHAT_JOIN";
export const USER_JOINED_EVENT = "USER_JOINED";