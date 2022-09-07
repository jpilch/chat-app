import express from "express";
import contactsService from "../services/contactsService";
import { parseContactIds } from "../parsers/parseUserIds";

export const contactsController = express.Router()

contactsController.get("/", async (_req, res) => {
    const contacts = await contactsService.findAll();
    return res.json(contacts);
})

contactsController.post("/", async (req, res) => {
    const ids = parseContactIds(req.body);
    const createdContacts = await contactsService.create(ids);
    return res.status(201).json(createdContacts);
})