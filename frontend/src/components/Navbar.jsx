import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiUser, FiLogOut, FiGrid, FiSettings } from "react-icons/fi";

export default function Navbar() {
  const { user, logout, isAuthenticated, initialized } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* ✅ Hooks must ALWAYS run */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  /* ✅ SAFE placeholder instead of return null */
  if (!initialized) {
    return (
      <nav className="h-16 bg-slate-900 flex items-center px-6 text-white">
        Loading...
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          Online Exam Portal
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <NavLink to="/" className="text-gray-400 hover:text-white">Home</NavLink>
          <NavLink to="/about" className="text-gray-400 hover:text-white">About</NavLink>
          <NavLink to="/contact" className="text-gray-400 hover:text-white">Contact</NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {!isAuthenticated ? (
            <div className="hidden md:flex gap-3">
              <Link to="/login" className="text-blue-400">Login</Link>
              <Link to="/register" className="bg-blue-600 px-4 py-2 rounded text-white">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(v => !v)}
                className="flex items-center gap-2 text-white"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
                  <FiUser />
                </div>
                <span className="hidden md:block">{user?.name}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg">
                  <Link to="/dashboard" className="flex gap-2 px-4 py-3 hover:bg-gray-100">
                    <FiGrid /> Dashboard
                  </Link>
                  <Link to="/profile" className="flex gap-2 px-4 py-3 hover:bg-gray-100">
                    <FiSettings /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden text-white text-2xl"
          >
            <FiMenu />
          </button>
        </div>
      </div>
    </nav>
  );
}
