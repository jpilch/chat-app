import { Server, Socket } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents } from "./io.types";
import { corsConfig } from "./io.config";
import { registerChatHandlers } from './chat.handlers';

import http from 'http';

function onConnection(socket: Socket) {
    console.log("User has connected", socket.id);
    registerChatHandlers(socket);
}

export async function attachSocketIoServer(httpServer: http.Server) {
    const io = new Server<ServerToClientEvents, ClientToServerEvents>(httpServer, {
        cors: corsConfig,
    });
    io.on("connection", onConnection);
} 