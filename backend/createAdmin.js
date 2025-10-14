import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js"; // adjust path if needed

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected"));

const createAdmin = async () => {
  const email = "biswojitsahoo42@gmail.com";       // your admin email
  const password = "Biswojit@2003";             // your admin password
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  await User.create({
    name: "Super Admin",
    email,
    password: hashedPassword,
    role: "Admin"
  });

  console.log("Admin created successfully");
  process.exit();
};

createAdmin();
