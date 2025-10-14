// backend/models/Attempt.js
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  givenAnswer: { type: mongoose.Schema.Types.Mixed },
  isCorrect: { type: Boolean, default: false },
  marksObtained: { type: Number, default: 0 },
});

const attemptSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [answerSchema],
  totalScore: { type: Number, default: 0 },
  status: { type: String, enum: ["in-progress", "submitted", "graded"], default: "submitted" },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Attempt", attemptSchema);
