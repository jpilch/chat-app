import dotenv from "dotenv";

dotenv.config();

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
export const JWT_SECRET: string = process.env.JWT_SECRET!;

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
export const JWT_EXPIRES_IN: number = Number(process.env.JWT_EXPIRES_IN!);