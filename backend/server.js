import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();
console.log("🚀 server.js started");


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);


// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

