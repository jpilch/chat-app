import express from "express";
import { contactService } from "../services/contactService";
import { parseContactIds } from "../parsers/parseUserIds";

export const contactController = express.Router()

contactController.get("/", async (_req, res) => {
    const contacts = await contactService.findAll();
    return res.json(contacts);
})

contactController.post("/", async (req, res) => {
    const ids = parseContactIds(req.body);
    const createdContacts = await contactService.create(ids);
    return res.status(201).json(createdContacts);
})