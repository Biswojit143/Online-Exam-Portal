import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { request } from "../api";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // ✅ NEW

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    // ✅ VALIDATION
    if (!name || !email || !password || !role) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const data = await request("/api/auth/register", {
        method: "POST",
        body: { name, email, password, role }, // ✅ role sent
      });

      if (data.token && data.user) {
        await login({ email, password });
      }

      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: 360,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,.08)",
        }}
      >
        <h2 style={{ marginBottom: 8 }}>Create Account</h2>

        <label style={{ display: "block", marginTop: 8 }}>Full Name</label>
        <input
          type="text"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label style={{ display: "block", marginTop: 12 }}>Email</label>
        <input
          type="email"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={{ display: "block", marginTop: 12 }}>Password</label>
        <input
          type="password"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ ROLE DROPDOWN */}
        <label style={{ display: "block", marginTop: 12 }}>Role</label>
        <select
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>

        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 16,
            width: "100%",
            padding: 10,
          }}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p style={{ marginTop: 10, textAlign: "center", fontSize: 14 }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
