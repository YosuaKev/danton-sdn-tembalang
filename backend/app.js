// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import guruRoutes from "./routes/guru.routes.js";
import siswaRoutes from "./routes/siswa.routes.js";
import errorHandler from "./middleware/error.handler.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api/gurus", guruRoutes);
app.use("/api/siswas", siswaRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;