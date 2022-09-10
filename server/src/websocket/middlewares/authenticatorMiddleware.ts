import { NextFunction } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../auth/config";
import { TokenPayload } from "../../auth/types/tokenPayload";
export type NextFunc = (err?: ExtendedError | undefined) => void

export function authenticatorMiddleware(socket: Socket, next: NextFunc) {
    try {
        const token = socket.handshake.auth.token;
        const data = jwt.verify(token, JWT_SECRET) as TokenPayload;
        socket.data = data;
        console.log({ data });
    } catch (err) {
        console.log({ err });
        next(new Error());
    }
}