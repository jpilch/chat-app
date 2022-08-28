import http from "http";

import { app } from "./app";
import { PORT } from "./common/config";

const server = http.createServer(app);

async function bootstrap(server: http.Server) {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

bootstrap(server);