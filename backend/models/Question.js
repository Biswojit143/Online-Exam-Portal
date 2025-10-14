// backend/models/Question.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  questionText: { type: String, required: true },
  type: { type: String, enum: ["mcq", "truefalse", "shortanswer"], default: "mcq" },
  options: [{ type: String }], // for mcq
  correctAnswer: { type: String }, // store as string or index
  marks: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model("Question", questionSchema);
