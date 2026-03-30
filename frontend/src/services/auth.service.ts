import axios from "axios";
import { api } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

// The exact shape of the data we will send to your Java Spring Boot backend
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

// What we expect Spring Boot to send back on success
export interface AuthResponse {
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
}

export const AuthService = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      // Sends the POST request to http://localhost:8080/api/auth/register
      const response = await api.post<AuthResponse>("/auth/register", data);
      return response.data;
    } catch (error: unknown) {
      // Handle strict TypeScript errors cleanly
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            "Registration failed. Please try again.",
        );
      }

      // Fallback for network crashes
      throw new Error(
        "An unexpected error occurred. Please check your connection.",
      );
    }
  },

  // ADD THIS LOGIN FUNCTION:
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      // Assuming your Spring Boot login endpoint is /auth/login (or /auth/authenticate)
      const response = await api.post<AuthResponse>("/auth/login", data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            "Invalid email or password.",
        );
      }
      throw new Error(
        "An unexpected error occurred. Please check your connection.",
      );
    }
  },

  logout: async () => {
    try {
      // 1. Grab the token you saved during login
      const token = localStorage.getItem("token");

      // 2. Send the logout request WITH the token in the header
      await api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 3. Delete the token from the browser so the user is truly logged out
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error logging out", error);
      // Even if the server fails, we should still clear the browser's token
      localStorage.removeItem("token");
    }
  },
};
