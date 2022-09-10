import express from "express";
import { conversationService } from "../services";

export const conversationController = express.Router();

conversationController.get("/", async (_req, res) => {
    const conversations = await conversationService.findAll();
    return res.json(conversations);
});