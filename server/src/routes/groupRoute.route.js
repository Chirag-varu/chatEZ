import express from "express";
import { createGroup } from "../controllers/group.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/createGroup", authenticate, createGroup);

export default route;
