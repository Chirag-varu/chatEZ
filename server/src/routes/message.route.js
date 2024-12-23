import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { getUsers, getMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", auth, getUsers);
router.get("/:id", auth, getMessage);

export default router;
