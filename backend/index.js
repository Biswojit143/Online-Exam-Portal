import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { protect, requireRole } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// Public routes
app.use("/api/v1/user", authRoutes);

// Example protected admin route
app.get("/api/v1/admin-dashboard", protect, requireRole(["Admin"]), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}` });
});

// Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
