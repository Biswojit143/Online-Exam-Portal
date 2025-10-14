import express from "express";
import {
  createExam,
  getMyExams,
  getExam,
  updateExam,
  deleteExam,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getExamAttempts,
  publishExam, // import the publishExam controller
} from "../controllers/teacherController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
console.log("✅ teacherRoutes.js loaded successfully");

const router = express.Router();

// protect + only teachers
router.use(protect);
router.use(authorizeRoles("teacher"));

// Exams
router.post("/exams", createExam);
router.get("/exams", getMyExams);
router.get("/exams/:id", getExam);
router.put("/exams/:id", updateExam);
router.delete("/exams/:id", deleteExam);
router.put("/exams/:id/publish", publishExam); // ← ADD THIS LINE

// Questions
router.post("/exams/:id/questions", addQuestion);
router.put("/questions/:qid", updateQuestion);
router.delete("/questions/:qid", deleteQuestion);

// View attempts
router.get("/exams/:id/attempts", getExamAttempts);

export default router;
