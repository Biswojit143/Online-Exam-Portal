import Exam from "../models/Exam.js";
import Question from "../models/Question.js";
import Attempt from "../models/Attempt.js";

// -----------------------------------------------------------
// Get all published exams
// -----------------------------------------------------------
export const getAvailableExams = async (req, res) => {
  try {
    const exams = await Exam.find({ status: "published" }).select(
      "title subject description duration totalMarks status"
    );
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------
// Get full exam details (with questions)
// -----------------------------------------------------------
export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("questions");
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (exam.status !== "published")
      return res.status(403).json({ message: "Exam not available yet" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------
// Start a new attempt
// -----------------------------------------------------------
export const startAttempt = async (req, res) => {
  try {
    const { id } = req.params; // examId
    const exam = await Exam.findById(id).populate("questions");
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    if (exam.status !== "published")
      return res.status(403).json({ message: "Exam not open" });

    // Check if student already submitted this exam
    const existing = await Attempt.findOne({
      examId: id,
      studentId: req.user._id,
      status: "submitted",
    });
    if (existing)
      return res.status(400).json({ message: "You have already submitted this exam" });

    // Timer logic: start/expiry time
    const startTime = new Date();
    const expiryTime = new Date(startTime.getTime() + exam.duration * 60000); // duration in ms

    const attempt = await Attempt.create({
      examId: id,
      studentId: req.user._id,
      answers: exam.questions.map((q) => ({
        questionId: q._id,
        givenAnswer: null,
        isCorrect: false,
        marksObtained: 0,
      })),
      status: "in-progress",
      startedAt: startTime,
      expiryTime: expiryTime,
      timeRemaining: exam.duration * 60, // seconds
    });

    res.status(201).json({
      message: "Attempt started",
      attempt,
      timerInfo: {
        startedAt: startTime,
        expiryTime: expiryTime,
        durationInSeconds: exam.duration * 60,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------
// Save answers (autosave)
// -----------------------------------------------------------
export const saveAttemptProgress = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id).populate("answers.questionId");
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    if (attempt.studentId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const now = new Date();
    if (attempt.expiryTime && now > attempt.expiryTime) {
      attempt.status = "expired";
      await attempt.save();
      return res.status(400).json({ message: "Time is up! Attempt is now expired.", status: "expired" });
    }
    if (attempt.status === "submitted" || attempt.status === "expired")
      return res.status(400).json({ message: "Attempt already submitted or expired" });

    const submittedAnswers = req.body.answers || [];
    attempt.answers.forEach((a) => {
      const submitted = submittedAnswers.find(
        (s) => s.questionId.toString() === a.questionId._id.toString()
      );
      if (submitted) {
        a.givenAnswer = submitted.givenAnswer;
      }
    });

    await attempt.save();
    res.json({ message: "Progress saved successfully", attempt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------
// Submit attempt (calculate total marks) -- strict timeout enforced
// -----------------------------------------------------------
export const submitAttempt = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id).populate(
      "answers.questionId"
    );
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    if (attempt.studentId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const now = new Date();
    if (attempt.expiryTime && now > attempt.expiryTime) {
      attempt.status = "expired";
      await attempt.save();
      return res.status(400).json({ message: "Time is up! Attempt expired and not accepted.", status: "expired" });
    }
    if (attempt.status === "submitted" || attempt.status === "expired")
      return res.status(400).json({ message: "Attempt already submitted or expired" });

    const submittedAnswers = req.body.answers || [];
    let total = 0;

    attempt.answers.forEach((a) => {
      const submitted = submittedAnswers.find(
        (s) => s.questionId.toString() === a.questionId._id.toString()
      );
      if (submitted) {
        a.givenAnswer = submitted.givenAnswer;
      }
      if (
        a.givenAnswer !== undefined &&
        a.givenAnswer !== null &&
        a.questionId.correctAnswer !== undefined &&
        a.questionId.correctAnswer !== null &&
        a.givenAnswer.toString().trim().toLowerCase() ===
          a.questionId.correctAnswer.toString().trim().toLowerCase()
      ) {
        a.isCorrect = true;
        a.marksObtained = a.questionId.marks || 1;
      } else {
        a.isCorrect = false;
        a.marksObtained = 0;
      }
      total += a.marksObtained;
    });

    attempt.totalScore = total;
    attempt.status = "submitted";
    attempt.submittedAt = new Date();
    await attempt.save();

    res.json({
      message: "Attempt submitted successfully",
      totalScore: total,
      attempt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------
// TIMER ENDPOINT: Get timer status for an attempt
// -----------------------------------------------------------
export const getAttemptTimer = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id);
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    if (attempt.studentId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const now = new Date();
    const timeRemaining = Math.max(0, Math.floor((attempt.expiryTime - now) / 1000));

    // Auto-expire if time's up
    if (timeRemaining <= 0 && attempt.status === "in-progress") {
      attempt.status = "expired";
      await attempt.save();
      return res.json({
        message: "Time expired! Exam auto-submitted.",
        timeRemaining: 0,
        status: "expired",
        attempt,
      });
    }

    res.json({
      timeRemaining,
      expiryTime: attempt.expiryTime,
      status: attempt.status,
      startedAt: attempt.startedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------
// Get all attempts for logged-in student
// -----------------------------------------------------------
export const getMyAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({ studentId: req.user._id })
      .populate("examId", "title subject totalMarks duration")
      .sort({ createdAt: -1 });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -----------------------------------------------------------
// Get details of one attempt
// -----------------------------------------------------------
export const getAttemptDetails = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id)
      .populate("examId", "title totalMarks duration")
      .populate("answers.questionId");

    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    if (attempt.studentId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    res.json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
