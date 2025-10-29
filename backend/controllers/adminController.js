import User from "../models/User.js";

// [GET] List all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [PUT] Update user role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params; // User ID
    const { role } = req.body; // New role: 'admin', 'teacher', 'student'
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();
    res.json({ message: "Role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [DELETE] Remove a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
