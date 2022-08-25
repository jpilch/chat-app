import { Request, Response, NextFunction } from "express";
import { ParsingError } from "../errors";

export function errorHandlerMiddleware(err: Error, _req: Request, res: Response, next: NextFunction) {
    if (!err) next();
    else if (err instanceof ParsingError) {
        const message = `${err.constructor.name}: ${err.message}`;
        return res.status(err.status).send(message);
    }
    else if (err instanceof Error) {
        const message = `${err.constructor.name}: ${err.message}`;
        return res.status(400).send(message);
    }
    next(err);
}