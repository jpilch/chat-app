import { Server, Socket } from "socket.io";
import http from "http";

import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "./types";
import { corsConfig } from "./config";

export async function attachSocketIoServer(httpServer: http.Server) {
    const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
        cors: corsConfig,
    });

    io.on("connection", (socket: Socket) => {
        console.log("User has connected", socket.id);

        socket.on("disconnect", () => {
            console.log("User has disconnected");
        });
    });
}

