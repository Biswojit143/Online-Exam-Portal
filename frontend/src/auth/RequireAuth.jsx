// src/auth/RequireAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and remember the route the user was trying to visit
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
