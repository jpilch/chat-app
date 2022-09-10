import express from "express";
import { parseMessage } from "../parsers";
import { messageService } from "../services";

export const messageController = express.Router();

messageController.get("/", async (_req, res) => {
    const messages = await messageService.findAll();
    return res.json(messages);
});

messageController.post("/", async (req, res) => {
    const message = parseMessage(req.body);
    const createdMessage = await messageService.create(message);
    return res.status(201).json(createdMessage);
});