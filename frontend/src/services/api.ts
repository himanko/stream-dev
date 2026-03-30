import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // This is critical for Spring Boot security if you use cookies for sessions
  withCredentials: true,
});

// We can add "Interceptors" here later to automatically attach JWT tokens to every request!
