import express from "express";
import { userService } from "../services/userService";

export const userController = express.Router();

userController.get("/", async (_req, res) => {
    const users = await userService.findAll();
    return res.json(users);
})