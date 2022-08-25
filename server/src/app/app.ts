import express from "express";
import cors from "cors";

import authRouter from "../auth/controllers/auth";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (_req, res) => {
    res.send("root");
});