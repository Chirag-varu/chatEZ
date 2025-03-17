import express from "express";
import {
  createGroup,
  getGroup,
  sendGroupMessage,
  getGroupMessage,
  deleteGroupMessage,
  deleteAllGroupMessages,
  deleteGroup
} from "../controllers/group.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/createGroup", authenticate, createGroup);

route.get("/getGroups/:id", authenticate, getGroup);

route.delete("/deleteGroup/:id", authenticate, deleteGroup);

route.post("/message/send/:id", authenticate, sendGroupMessage);

route.get("/message/getMessages/:id", authenticate, getGroupMessage);

route.delete("/message/delete/:id", authenticate, deleteGroupMessage);

route.delete("/message/deleteAllGroupMessages/:id", authenticate, deleteAllGroupMessages);

export default route;
