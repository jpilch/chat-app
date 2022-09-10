import express from "express";
import { authenticatorMiddleware } from "../../auth/middlewares";
import { userService } from "../services/userService";

export const userController = express.Router();

userController.get("/", async (_req, res) => {
    const users = await userService.findAll();
    return res.json(users);
});

userController.get(
    "/me",
    authenticatorMiddleware,
    async (req, res) => {
        const { username } = req.user!;
        const user = await userService.findByUsername(username);
        return res.json(user);
    }
);

userController.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await userService.findById(id);
    return res.json(user);
});

userController.get(
    "/me/conversations",
    authenticatorMiddleware,
    async (req, res) => {
        const { id } = req.user!;
        const contactConversations = await userService.findAllConversationsFrom({ userId: id });
        return res.json(contactConversations);
    }
);