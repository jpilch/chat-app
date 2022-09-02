import { io, Socket } from "socket.io-client";
import { AuthState } from "../auth/state/authSlice";
import { USER_AUTH_DATA } from "../common/config";
import { localStorageGet } from "../common/utils";

export class ChatSocket {
    private static serverUrl: string = import.meta.env.VITE_SERVER_URL;
    private static instance: ChatSocket;
    public readonly socket: Socket;

    private constructor() {
        const { token } = localStorageGet(USER_AUTH_DATA) as Partial<AuthState>;
        this.socket = io(ChatSocket.serverUrl, {
            auth: { token },
            autoConnect: false
        });
    }

    public static getInstance(): ChatSocket {
        if (!ChatSocket.instance) {
            ChatSocket.instance = new ChatSocket();
        }
        return ChatSocket.instance;
    }

    public getSocket(): Socket {
        return this.socket;
    }

    public connect(): void {
        this.socket.connect();
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}