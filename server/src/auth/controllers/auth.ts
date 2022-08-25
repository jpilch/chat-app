import express from "express";

import { parseUser } from "../parsers";
import { authService } from "../services";

const authRouter = express.Router();

authRouter.get("/", (_req, res) => {
    return res
        .setHeader("Content-Type", "application/json")
        .send("dummy endpoint");
});

authRouter.post("/register", async (req, res) => {
    try {
        const user = parseUser(req.body);
        const createdUser = await authService.registerUser(user);
        return res.status(201).json(createdUser);
    } catch (err) {
        let message = "Error occured";
        if (err instanceof Error) message += `: ${err.message}`;
        return res.status(400).send(message);
    }
})

export default authRouter;