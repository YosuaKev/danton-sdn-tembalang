import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
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

// Load environment variables
dotenv.config();

const app = express();

// Check if running in serverless environment
const isLambda = !!process.env.LAMBDA_TASK_ROOT;

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    "https://sdn-tembalang.vercel.app",
    "https://danton-backend.vercel.app"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
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

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend server is running",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Database connection and server start (only for non-serverless)
if (!isLambda) {
  const startServer = async () => {
    try {
      await connectDB();
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
      });
    } catch (error) {
      console.error("Database connection failed", error);
      process.exit(1);
    }
  };
  
  startServer();
}

export default app;