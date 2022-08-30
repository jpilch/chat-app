import express from "express";

import { parseUser } from "../parsers";
import { parseLoginCredentials } from "../parsers/loginCredentialsParser";
import { authService } from "../services";
import { authenticatorMiddleware } from "../middlewares";

export const authController = express.Router();

authController.get("/", authenticatorMiddleware, (req, res) => {
    console.log(req.user)
    return res
        .setHeader("Content-Type", "application/json")
        .send("dummy endpoint");
});

authController.post("/register", async (req, res) => {
    const user = parseUser(req.body);
    const createdUser = await authService.register(user);
    return res.status(201).json(createdUser);
});

authController.post("/login", async (req, res) => {
    const credentials = parseLoginCredentials(req.body);
    const token = await authService.login(credentials);
    const { username } = credentials;
    return res.json({ token, username });
})

export default authController;