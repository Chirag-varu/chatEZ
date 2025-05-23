import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/userRoute.route.js";
import messageRoutes from "./routes/message.route.js";
import groupRoute from "./routes/groupRoute.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { app, server } from "./lib/socket.js";
import path from "path";
import job from "./lib/cron.js";

dotenv.config();
// const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.get("/healthcheck", (req, res) => {
  res.status(200).send("Server is healthy");
});

// app.use(limiter);
job.start();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://chatez-fn9w.onrender.com", "https://main.d11aka4621zqa2.amplifyapp.com"],
    credentials: true,
  })
);

app.use("/api/v2/auth", authRoute);
app.use("/api/v2/user", userRoute);
app.use("/api/v2/message", messageRoutes);
app.use("/api/v2/group", groupRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}
export default app;

server.listen(PORT, () => {
  console.log(`Server is running on PORT - ${PORT}`);
  connectDB();
});
