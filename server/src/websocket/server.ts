import { Server, Socket } from "socket.io";
import http from "http";

import { QC_USER_JOINED_EVENT, QC_USER_TYPING_EVENT, QC_FETCH_PARTICIPANTS_EVENT, QC_USER_LEFT_EVENT, QC_SEND_MESSAGE_EVENT, QC_JOIN_EVENT } from "../quickchat/constants/events";
import { QCServerToClientEvents, QCClientToServerEvents, QCInterServerEvents, QCSocketData } from "../quickchat/types";
import { corsConfig } from "./config";

export async function attachQCSocketIoServer(httpServer: http.Server) {
    const io = new Server<QCClientToServerEvents, QCServerToClientEvents, QCInterServerEvents, QCSocketData>(httpServer, {
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

