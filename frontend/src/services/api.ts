import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// --- THE FIX: Add the Axios Interceptor ---
// This runs automatically right before every single API call
api.interceptors.request.use(
  (config) => {
    // 1. Grab the token from local storage
    const token = localStorage.getItem("authToken");

    // 2. If it exists, staple it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
