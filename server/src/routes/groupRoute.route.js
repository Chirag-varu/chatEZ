import express from "express";
import {
  createGroup,
  getGroup,
  sendGroupMessage,
  getGroupMessage,
  deleteGroupMessage,
} from "../controllers/group.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/createGroup", authenticate, createGroup);

route.post("/message/send/:id", authenticate, sendGroupMessage);

route.get("/message/getMessages/:id", authenticate, getGroupMessage);

route.get("/getGroups/:id", authenticate, getGroup);

route.delete("/message/delete/:id", authenticate, deleteGroupMessage);

export default route;
