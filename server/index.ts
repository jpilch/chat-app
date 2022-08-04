import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { PORT } from "./env";

import { corsConfig } from "./config";

import { ServerToClientEvents, ClientToServerEvents } from "./types/socket-io";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("root");
});

const server = http.createServer(app);
const io = new Server<ServerToClientEvents, ClientToServerEvents>(server, {
    cors: corsConfig,
});

io.on("connection", socket => {
    console.log("User has connected")
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
