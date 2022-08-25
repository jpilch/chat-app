import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

import { User, UserInDb } from "../types";
import { IAuthService } from "../types/authService";

const prisma = new PrismaClient();

async function registerUser(user: User): Promise<UserInDb> {
    const { email, username, password } = user;
    const passwordHash = await argon2.hash(password);
    return prisma.user.create({
        data: { email, username, passwordHash }
    });
}

export const authService: IAuthService = {
    registerUser
}