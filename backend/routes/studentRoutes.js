import express from "express";
import {
  getAvailableExams,
  getExamById,
  startAttempt,
  saveAttemptProgress,
  submitAttempt,
  getMyAttempts,
  getAttemptTimer,
} from "../controllers/studentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

console.log("✅ studentRoutes.js loaded successfully");

const router = express.Router();

// Protect routes + allow only users with role 'student' (case-sensitive)
router.use(protect);
router.use(authorizeRoles("student"));

// Exams
router.get("/exams", getAvailableExams);
router.get("/exams/:id", getExamById);

// Attempts
router.post("/exams/:id/start", startAttempt);
router.get('/attempts/:id/timer', getAttemptTimer);  // Removed undefined authenticate here
router.put("/attempts/:id/save", saveAttemptProgress);
router.put("/attempts/:id/submit", submitAttempt);
router.get("/attempts/my", getMyAttempts);

export default router;
