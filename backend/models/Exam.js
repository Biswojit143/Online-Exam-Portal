// backend/models/Exam.js
import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String },
  description: { type: String },
  duration: { type: Number }, // minutes
  totalMarks: { type: Number, default: 0 },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  status: {
    type: String,
    enum: ["draft", "published", "closed"],
    default: "draft",
  },
}, { timestamps: true });

export default mongoose.model("Exam", examSchema);
