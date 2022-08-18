import http from "http";

import { app } from "./app";
import { PORT } from "./common";

const server = http.createServer(app);

import { attachSocketIoServer } from "./websocket";

attachSocketIoServer(server)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    }).catch(_err => {
        console.log("An error occured");
    });