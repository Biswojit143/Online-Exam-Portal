// backend/middleware/roleMiddleware.js

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Normalize role to lowercase so "Teacher" or "teacher" both work
    const userRole = req.user.role?.toLowerCase();

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }

    next();
  };
};
