import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080", // your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors (for auth token, refresh token, etc.)
api.interceptors.request.use(
  (config) => {
    // Example: attach token if available
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
// src/api/index.ts
export * from './auth.api';
export * from './users.api';
export * from './roles.api';
