// src/api.js
// Centralized fetch wrapper for your React app.
// Adjust VITE_API_BASE in .env (e.g. VITE_API_BASE=http://localhost:5000)

const API_BASE = import.meta.env.VITE_API_BASE || "";

async function request(path, { method = "GET", body, headers = {}, includeCreds = true } = {}) {
  const url = `${API_BASE}${path}`;
  const opts = {
    method,
    headers: { ...headers },
    credentials: includeCreds ? "include" : "same-origin", // include cookies if backend sets them
  };

  // attach token from localStorage if present (for bearer-token backends)
  try {
    const token = localStorage.getItem("token");
    if (token) {
      opts.headers = { ...opts.headers, Authorization: `Bearer ${token}` };
    }
  } catch (e) {
    // ignore localStorage access errors
  }

  if (body) {
    if (body instanceof FormData) {
      // let browser set Content-Type (with boundary)
      opts.body = body;
    } else {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }
  }

  const res = await fetch(url, opts);
  const text = await res.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    // Non-JSON response
    const error = new Error(`Unexpected non-JSON response from ${url}`);
    error.status = res.status;
    error.raw = text;
    throw error;
  }

  if (!res.ok) {
    const message = data?.message || data?.error || res.statusText || "Request failed";
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export { request, API_BASE };
