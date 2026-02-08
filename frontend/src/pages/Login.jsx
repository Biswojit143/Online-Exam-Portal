// src/pages/Login.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // if user was redirected to login, after login send them back
  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      // successful login -> navigate to original page
      navigate(from, { replace: true });
    } catch (err) {
      // err.message comes from request() wrapper or backend message
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      display: "grid",
      placeItems: "center",
      minHeight: "100vh",
      background: "#f3f4f6"
    }}>
      <form onSubmit={handleSubmit} style={{
        width: 360,
        background: "#fff",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(0,0,0,.08)"
      }}>
        <h2 style={{ marginBottom: 8 }}>Sign in</h2>

        <label style={{ display: "block", marginTop: 8 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          required
        />

        <label style={{ display: "block", marginTop: 12 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          required
        />

        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 16, width: "100%", padding: 10 }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p style={{ marginTop: 10, textAlign: "center", fontSize: 14 }}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}
