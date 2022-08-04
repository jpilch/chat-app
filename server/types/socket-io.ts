export interface ServerToClientEvents {
    notify: (message: string) => void;
}

export interface ClientToServerEvents {
    joinRoom: (username: string, roomId: string) => void;
}