import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // THIS is the only authentication logic you need now!
  // It tells the browser to automatically send the secure Redis session cookie.
  withCredentials: true,
});

// Notice: The interceptor is COMPLETELY DELETED!
