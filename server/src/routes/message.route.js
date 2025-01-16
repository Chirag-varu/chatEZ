import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getUsers, getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", authenticate, getUsers);

router.get("/:id", authenticate, getMessage);

router.post("/send/:id", authenticate, sendMessage);

export default router;
