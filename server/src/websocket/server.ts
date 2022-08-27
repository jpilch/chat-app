import { Server, Socket } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData, QC_USER_JOINED_EVENT, QC_USER_TYPING_EVENT, QC_FETCH_PARTICIPANTS_EVENT, QC_USER_LEFT_EVENT } from "./types/events";
import { QC_SEND_MESSAGE_EVENT, QC_JOIN_EVENT } from "./types/events";
import { corsConfig } from "./config";

import http from "http";

export async function attachSocketIoServer(httpServer: http.Server) {
    const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
        cors: corsConfig,
    });

    io.on("connection", (socket: Socket) => {
        console.log("User has connected", socket.id);

        socket.on(QC_JOIN_EVENT, async (data) => {
            const sockets = await io.in(data.roomId).fetchSockets();
            socket.data = { username: data.username, roomId: data.roomId };
            socket.join(data.roomId);
            socket.join(`${data.username}__${data.roomId}`);
            io.to(`${data.username}__${data.roomId}`).emit(QC_FETCH_PARTICIPANTS_EVENT, sockets.map(s => s.data.username));
            io.to(data.roomId).emit(QC_USER_JOINED_EVENT, { username: data.username });
            console.log(socket.rooms);
        });

        socket.on(QC_SEND_MESSAGE_EVENT, ({ content, author, roomId }: { author: string, content: string, roomId: string }) => {
            io.to(roomId).emit(QC_SEND_MESSAGE_EVENT, { author, content });
        });

        socket.on(QC_USER_TYPING_EVENT, ({ username, roomId }) => {
            io.to(roomId).emit(QC_USER_TYPING_EVENT, username);
        });

        socket.on("disconnect", () => {
            console.log("User has disconnected", socket.data);
            io.to(socket.data.roomId).emit(QC_USER_LEFT_EVENT, socket.data.username);
        });
    });
}

