import { PrismaClient } from "@prisma/client";
import { UserInDb } from "../../auth/types";

const prisma = new PrismaClient();

export async function findAll(): Promise<UserInDb[]> {
    return prisma.user.findMany();
}

export const userService = {
    findAll
}