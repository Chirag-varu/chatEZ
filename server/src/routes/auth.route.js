import express from "express";
import { signup, sendOTP2, login, adminLogin, logout, deleteAcc, updateProfile, updatePassword, checkAuth, verifyOTP, verifyOTP2 } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/sendOTP", sendOTP2);

router.post("/verify-otp", verifyOTP);

router.post("/verify-otp2", verifyOTP2);

router.post("/login", login);

router.post("/adminLogin", adminLogin);

router.post("/logout", logout);

router.delete("/delete-account", authenticate, deleteAcc);

router.put("/update-profile", authenticate, updateProfile);

router.put("/update-password", updatePassword);

router.get("/check", authenticate, checkAuth);

export default router;
