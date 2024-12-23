import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT - ${PORT}`);
  connectDB();
});
