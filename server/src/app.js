import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import catalogRoutes from "./routes/catalogRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import revenueRoutes from "./routes/revenueRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173,http://localhost:5175")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "Royal Tiffin API is running",
    health: "/api/health",
    frontend: allowedOrigins,
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "royal-tiffin-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/revenue", revenueRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

export default app;
