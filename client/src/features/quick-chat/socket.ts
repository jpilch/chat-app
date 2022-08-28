import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_QC_SERVER_URL);

// export class QuickChatSocket {
//     private static serverUrl: string = import.meta.env.VITE_QC_SERVER_URL;
//     private static instance: QuickChatSocket;
//     public readonly socket;

//     private constructor() {
//         this.socket = io(QuickChatSocket.serverUrl);
//     }

//     public static getInstance(): QuickChatSocket {
//         if (!QuickChatSocket.instance) {
//             QuickChatSocket.instance = new QuickChatSocket();
//         }
//         return QuickChatSocket.instance;
//     }
// }