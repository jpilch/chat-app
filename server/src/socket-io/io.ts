import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents } from "./io.types";
import { corsConfig } from "./io.config";

import http from 'http';

export async function attachSocketIoServer(httpServer: http.Server) {
    const io = new Server<ServerToClientEvents, ClientToServerEvents>(httpServer, {
        cors: corsConfig,
    });
    io.on("connection", socket => {
        console.log("User has connected");
    });
} 