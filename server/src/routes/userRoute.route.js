import express from "express";
import { getAllUsers, deleteUser, checkAdmin } from "../controllers/getAllUsers.controller.js";
import { isAdmin } from "../middleware/auth.middleware.js";

const route = express.Router();

route.get("/getAllUsers", isAdmin, getAllUsers);

route.delete("/deleteUser", isAdmin, deleteUser);

route.get("/checkAdmin", isAdmin, checkAdmin);

export default route;
