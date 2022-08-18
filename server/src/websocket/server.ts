import { Server, Socket } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "./types/events";
import { SEND_MESSAGE_EVENT, QUICKCHAT_JOIN_EVENT } from "./types/events";
import { corsConfig } from "./config";

import http from "http";

export async function attachSocketIoServer(httpServer: http.Server) {
    const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
        cors: corsConfig,
    });

    io.on("connection", (socket: Socket) => {
        console.log("User has connected", socket.id);

        socket.on(QUICKCHAT_JOIN_EVENT, (data) => {
            socket.join(data.roomId);
            socket.join(`${data.username}__${data.roomId}`);
            console.log(socket.rooms)
        })

        socket.on(SEND_MESSAGE_EVENT, ({ content, author, roomId }: { author: string, content: string, roomId: string }) => {
            console.log('send-message handler', { content, author, roomId })
            io.to(roomId).emit(SEND_MESSAGE_EVENT, { author, content });
        })

        socket.on('disconnect', () => {
            console.log("User has disconnected", socket.id);
        })
    });
}

