import React from "react";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "./auth/RequireAuth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; // ✅ Profile imported

export default function App() {
  return (
    <>
      {/* ✅ Navbar rendered ONCE, globally */}
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="p-6 text-lg">
              Page not found.{" "}
              <a className="text-blue-500 underline" href="/">
                Go Home
              </a>
            </div>
          }
        />
      </Routes>

      {/* ✅ Footer rendered ONCE, globally */}
      <Footer />
    </>
  );
}
