import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { LoginCredentials, User, UserInDb } from "../types";
import { IAuthService } from "../types/authService";
import { JWT_SECRET } from "../../common/config";
import { TokenPayload } from "../types/tokenPayload";

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
    if (!user || !passwordMatches) throw new Error("auth failed");
    const payload: TokenPayload = { username: user.username }
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

export const authService: IAuthService = {
    register,
    login
}