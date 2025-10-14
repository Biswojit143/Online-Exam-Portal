import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("✅ authRoutes.js loaded successfully");

// Register (Student / Teacher)
router.post("/register", registerUser);

// Login (All roles)
router.post("/login", loginUser);

// Profile (All roles)
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
