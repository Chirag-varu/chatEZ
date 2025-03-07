import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getUsers, getMessage, sendMessage, deleteMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", authenticate, getUsers);

router.get("/:id", authenticate, getMessage);

router.post("/send/:id", authenticate, sendMessage);

router.delete("/delete/:id", authenticate, deleteMessage);

export default router;
