import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ===========================
   PROTECT ROUTE (JWT)
=========================== */
export const protect = async (req, res, next) => {
  try {
    // 1️⃣ Check Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach user to request
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
};

/* ===========================
   ROLE-BASED ACCESS
=========================== */
export const requireRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
};
