import dotenv from "dotenv";

dotenv.config();

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
export const PORT = Number(process.env.PORT!);

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
export const CLIENT_URL: string = process.env.CLIENT_URL!;

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
export const JWT_SECRET: string = process.env.JWT_SECRET!;