import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  givenAnswer: { type: mongoose.Schema.Types.Mixed },
  isCorrect: { type: Boolean, default: false },
  marksObtained: { type: Number, default: 0 },
});

const attemptSchema = new mongoose.Schema(
  {
    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answers: [answerSchema],
    totalScore: { type: Number, default: 0 },
    status: { type: String, enum: ["in-progress", "submitted", "graded", "expired"], default: "in-progress" },
    startedAt: { type: Date, required: true }, // when exam started
    expiryTime: { type: Date }, // when exam should end (startedAt + duration)
    submittedAt: { type: Date }, // only set during submission
    timeRemaining: { type: Number }, // in seconds (for frontend reference)
  },
  { timestamps: true }
);

export default mongoose.model("Attempt", attemptSchema);
