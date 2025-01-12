import express from "express";
import { getAllUsers } from "../controllers/getAllUsers.controller.js";
// import { authenticateAdmin } from "../middleware/auth.middleware";

const route = express.Router();

route.get("/getAllUsers", getAllUsers);

export default route;
