import express from "express";
import "express-async-errors";
import cors from "cors";

import { authController } from "../auth/controllers";
import { contactsController } from "../contacts/controllers";
import { usersController } from "../users/controllers";
import { conversationController } from "../conversation/controllers";
import { errorHandlerMiddleware } from "../common/middlewares";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("root");
});

app.use("/auth", authController);
app.use("/users", usersController);
app.use("/contacts", contactsController)
app.use("/conversations", conversationController)

app.use(errorHandlerMiddleware);