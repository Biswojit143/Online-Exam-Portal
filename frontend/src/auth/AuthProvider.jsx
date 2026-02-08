// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { request } from "../api";

const AuthContext = createContext(null);

// ✅ Hook (stable reference)
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  // =========================
  // RESTORE AUTH STATE
  // =========================
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // =========================
  // VERIFY SESSION (ONCE)
  // =========================
  useEffect(() => {
    const verifySession = async () => {
      try {
        if (token) {
          const data = await request("/api/auth/verify");
          if (data?.user) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        }
      } catch {
        console.warn("Auth verify failed, keeping local session");
      } finally {
        setInitialized(true);
      }
    };

    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // LOGIN
  // =========================
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await request("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await request("/api/auth/register", {
        method: "POST",
        body: payload,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    initialized,
    login,
    register,
    logout,
    isAuthenticated: Boolean(token),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Stable exports (Fast Refresh friendly)
export { AuthProvider, useAuth };
export default AuthProvider;
