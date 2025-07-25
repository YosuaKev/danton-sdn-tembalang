import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import guruRoutes from "./routes/guru.routes.js";
import siswaRoutes from "./routes/siswa.routes.js";
import errorHandler from "./middleware/error.handler.js";
import beritaRoutes from "./routes/berita.routes.js";
import kontakRoutes from "./routes/kontak.routes.js";
import galeriRoutes from "./routes/galeri.routes.js";
import homeRoutes from "./routes/home.routes.js";
import profilRoutes from "./routes/profil.routes.js";
import footerRoutes from "./routes/footer.routes.js"; 
import calendarRoutes from "./routes/calendar.routes.js";
import Activities from "./routes/activity.routes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
await connectDB();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://frontend-sdn-tembalang.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gurus", guruRoutes);
app.use("/api/siswas", siswaRoutes);
app.use("/api/kontak", kontakRoutes);
app.use("/api/berita", beritaRoutes);
app.use("/api/galeri", galeriRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/profil", profilRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/activities", Activities);

app.get("/", (req, res) => {
  res.send("Backend server is running on Vercel");
});

// Error handler
app.use(errorHandler);

// Unhandled error middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

export default app;