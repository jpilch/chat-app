import express from "express";

import { parseUser } from "../parsers";
import { parseLoginCredentials } from "../parsers/loginCredentialsParser";
import { authService } from "../services";

export const authController = express.Router();

authController.get("/", (_req, res) => {
    return res
        .setHeader("Content-Type", "application/json")
        .send("dummy endpoint");
});

authController.post("/register", async (req, res) => {
    const user = parseUser(req.body);
    const createdUser = await authService.registerUser(user);
    return res.status(201).json(createdUser);
});

authController.post("/login", async (req, res) => {
    const credentials = parseLoginCredentials(req.body);
    console.log(credentials);
    return res.json(credentials);
})

export default authController;