import express from "express";
import usersService from "../services/usersService";

export const usersController = express.Router();

usersController.get("/", async (_req, res) => {
    const users = await usersService.findAll();
    return res.json(users);
})