import express from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only 'admin' should access these routes
router.use(protect);
router.use(authorizeRoles("admin"));

// List all users
router.get("/users", getAllUsers);

// Update role
router.put("/users/:id/role", updateUserRole);

// Delete user
router.delete("/users/:id", deleteUser);

export default router;
