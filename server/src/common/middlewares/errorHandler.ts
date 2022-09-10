import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ParsingError, AuthenticationError } from "../errors";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function errorHandlerMiddleware(err: any, _req: Request, res: Response, next: NextFunction) {
    if (err instanceof ParsingError || err instanceof AuthenticationError)
        return res.status(err.status).send(err.description);
    else if (err instanceof JsonWebTokenError)
        return res.status(400).send(`${err.constructor.name}: ${err.message}`);
    else if (err instanceof Error)
        return res.status(400).send(`Error: ${err.message}`);
    else next(err);
}