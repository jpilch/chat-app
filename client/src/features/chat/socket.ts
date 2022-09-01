import { io, Socket } from "socket.io-client";

export class ChatSocket {
    private static serverUrl: string = import.meta.env.VITE_SERVER_URL;
    private static instance: ChatSocket;
    public readonly socket: Socket;

    private constructor() {
        this.socket = io(ChatSocket.serverUrl);
    }

    public static getInstance(): ChatSocket {
        console.log("CONSTRUCTOR")
        if (!ChatSocket.instance) {
            ChatSocket.instance = new ChatSocket();
        }
        return ChatSocket.instance;
    }

    public getSocket(): Socket {
        return this.socket;
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}