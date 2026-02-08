import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";

/* ===========================
   REGISTER
=========================== */
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields required" });
  }

  if (!["Student", "Teacher"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User exists" });

    const user = await User.create({ name, email, password, role });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   LOGIN
=========================== */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email & password required" });

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   GET PROFILE
=========================== */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ CONSISTENT RESPONSE
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   UPDATE PROFILE
=========================== */
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { name, password, bio } = req.body;

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (password) user.password = password;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profiles",
      });
      user.profileImage = result.secure_url;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   VERIFY AUTH
=========================== */
export const verifyAuth = async (req, res) => {
  try {
    res.json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        bio: req.user.bio,
        profileImage: req.user.profileImage,
      },
    });
  } catch {
    res.status(500).json({ error: "Verification failed" });
  }
};