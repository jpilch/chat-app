import http from "http";

import { app } from "./app";
import { PORT } from "./common/config";
import { attachSocketIoServer } from "./websocket";

const server = http.createServer(app);

async function bootstrap(server: http.Server) {
    await attachSocketIoServer(server);
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

bootstrap(server);