import { Socket } from "socket.io";

function joinRoom(socket: Socket, roomId: string): void {
    socket.join(roomId);
};

export function registerChatHandlers(socket: Socket): void {
    socket.on('chat:join', (roomId) => joinRoom(socket, roomId));
};