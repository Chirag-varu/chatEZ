import express from "express";
import { getAllUsers } from "../controllers/getAllUsers.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const route = express.Router();

route.get("/getAllUsers", authenticate, getAllUsers);

export default route;
