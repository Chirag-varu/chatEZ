import express from "express";
import { signup, login, adminLogin, logout, deleteAcc, updateProfile, checkAuth, verifyOTP } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/verify-otp", verifyOTP);

router.post("/login", login);

router.post("/adminLogin", adminLogin);

router.post("/logout", logout);

router.delete("/delete-account", authenticate, deleteAcc);

router.put("/update-profile", authenticate, updateProfile);

router.get("/check", authenticate, checkAuth);

export default router;
