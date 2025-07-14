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
import beritaRoutes from "./routes/berita.routes.js";
import kontakRoutes from "./routes/kontak.routes.js";
import galeriRoutes from "./routes/galeri.routes.js";
import homeRoutes from "./routes/home.routes.js"; // Add this line


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
app.use("/api/kontak", kontakRoutes);
app.use("/api/berita", beritaRoutes);
app.use("/api/galeri", galeriRoutes);
app.use("/api/home", homeRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;