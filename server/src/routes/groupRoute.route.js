import express from "express";
import { createGroup, getGroup } from "../controllers/group.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/createGroup", authenticate, createGroup);

route.get("/getGroups/:id", authenticate, getGroup);

export default route;
