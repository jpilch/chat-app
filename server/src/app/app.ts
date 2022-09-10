import express from "express";
import "express-async-errors";
import cors from "cors";

import { authController } from "../auth/controllers";
import { contactController } from "../contact/controllers";
import { userController } from "../user/controllers";
import { conversationController } from "../conversation/controllers";
import { messageController } from "../message/controllers";
import { errorHandlerMiddleware } from "../common/middlewares";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("root");
});

app.use("/auth", authController);
app.use("/users", userController);
app.use("/contacts", contactController);
app.use("/conversations", conversationController);
app.use("/messages", messageController);

app.use(errorHandlerMiddleware);