import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import { AuthenticationError } from "../../common/errors";
import { TokenPayload } from "../types/tokenPayload";

export function authenticatorMiddleware(req: Request, _res: Response, next: NextFunction) {
    if (!req.headers.authorization || !req.headers.authorization.includes("Bearer "))
        throw new AuthenticationError("Authorization header incorrect or missing");
    const token = req.headers.authorization.substring(7);
    if (!token) throw new AuthenticationError("Authentication token incorrect or missing");
    req.user = jwt.verify(token, JWT_SECRET) as TokenPayload;
    next();
}