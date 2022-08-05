import http from "http";

import { app } from './app';
import { PORT } from './common/config'

const server = http.createServer(app);

import { attachSocketIoServer } from './socket-io'

attachSocketIoServer(server)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    }).catch(err => {
        console.log('An error occured');
    });