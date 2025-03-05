import express from "express";
import rateLimit from 'express-rate-limit';
import { signup, sendOTP2, login, adminLogin, adminLogout, logout, deleteAcc, updateProfile, updatePassword, checkAuth, verifyOTP, verifyOTP2 } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max 5 requests per IP in 15 minutes
    message: "Too many OTP requests, please try again later."
  });

router.post("/signup", signup);

router.post("/sendOTP", otpLimiter, sendOTP2);

router.post("/verify-otp", verifyOTP);

router.post("/verify-otp2", verifyOTP2);

router.post("/login", login);

router.post("/adminLogin", adminLogin);

router.post("/adminLogout", adminLogout);

router.post("/logout", logout);

router.delete("/delete-account", authenticate, deleteAcc);

router.put("/update-profile", authenticate, updateProfile);

router.put("/update-password", updatePassword);

router.get("/check", authenticate, checkAuth);

export default router;
