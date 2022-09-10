import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { LoginCredentials, User, UserInDb } from "../types";
import { IAuthService } from "../types/authService";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config";
import { TokenPayload } from "../types/tokenPayload";
import { AuthenticationError } from "../../common/errors";

const prisma = new PrismaClient();

async function register(user: User): Promise<UserInDb> {
    const { email, username, password } = user;
    const passwordHash = await argon2.hash(password);
    return prisma.user.create({
        data: { email, username, passwordHash }
    });
}

async function login(credentials: LoginCredentials): Promise<string> {
    const user = await prisma.user.findUnique({
        where: { username: credentials.username }
    });
    const passwordMatches: boolean = user
        ? await argon2.verify(user.passwordHash, credentials.password)
        : false;
    if (!user || !passwordMatches) throw new AuthenticationError(
        "Username or password do not match");
    const payload: TokenPayload = { username: user.username, id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
}

export const authService: IAuthService = {
    register,
    login
};