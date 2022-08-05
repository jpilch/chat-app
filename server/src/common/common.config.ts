import dotenv from "dotenv";

dotenv.config();

export const PORT: number = Number(process.env.PORT!);

export const CLIENT_URL: string = process.env.CLIENT_URL!;