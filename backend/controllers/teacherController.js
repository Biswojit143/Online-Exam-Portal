// backend/controllers/teacherController.js
import Exam from "../models/Exam.js";
import Question from "../models/Question.js";
import Attempt from "../models/Attempt.js";

// ----------------------- EXAMS -----------------------

// Create exam
export const createExam = async (req, res) => {
  try {
    const { title, subject, description, duration, totalMarks } = req.body;
    const exam = await Exam.create({
      title,
      subject,
      description,
      duration,
      totalMarks,
      teacherId: req.user._id,
    });
    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all exams created by this teacher
export const getMyExams = async (req, res) => {
  try {
    const exams = await Exam.find({ teacherId: req.user._id }).populate("questions");
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single exam with questions
export const getExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("questions");
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (exam.teacherId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update exam
export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (exam.teacherId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(exam, req.body);
    await exam.save();
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete exam and its questions
export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (exam.teacherId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    // Delete all questions and attempts
    await Question.deleteMany({ examId: exam._id });
    await Attempt.deleteMany({ examId: exam._id });

    // Delete exam itself
    await exam.deleteOne();

    res.json({ message: "Exam and related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Publish exam
export const publishExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (exam.teacherId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    exam.status = "published";
    await exam.save();

    res.json({ message: "Exam published", exam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------- QUESTIONS -----------------------

// Add question
export const addQuestion = async (req, res) => {
  try {
    const { questionText, type, options, correctAnswer, marks } = req.body;
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (exam.teacherId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const question = await Question.create({
      examId: exam._id,
      questionText,
      type,
      options,
      correctAnswer,
      marks,
    });

    exam.questions.push(question._id);
    await exam.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update question
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.qid);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const exam = await Exam.findById(question.examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (exam.teacherId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(question, req.body);
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.qid);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const exam = await Exam.findById(question.examId);
    if (exam.teacherId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await Question.findByIdAndDelete(req.params.qid);
    exam.questions = exam.questions.filter(id => id.toString() !== req.params.qid);
    await exam.save();

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------- ATTEMPTS -----------------------

// View exam attempts
export const getExamAttempts = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (exam.teacherId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const attempts = await Attempt.find({ examId: exam._id })
      .populate("studentId", "name email")
      .populate("answers.questionId", "questionText marks");

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
