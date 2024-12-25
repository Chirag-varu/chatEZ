import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { getUsers, getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", auth, getUsers);
router.get("/:id", auth, getMessage);

router.post("/send/:id", auth, sendMessage);

export default router;
