import axios from "axios";
import { api } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

// The exact shape of the data we send to your Java Spring Boot backend
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
      const response = await api.post<AuthResponse>("/auth/register", data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error ||
            error.response?.data?.message ||
            "Registration failed. Please try again.",
        );
      }
      throw new Error(
        "An unexpected error occurred. Please check your connection.",
      );
    }
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
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
      // We no longer need to manually attach the token to the headers here.
      // Your Axios interceptor (in api.ts) automatically attaches it for us!
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Error logging out", error);
    } finally {
      // CRITICAL: We use a finally block to guarantee the token is deleted from the browser,
      // even if the backend server is temporarily down or throws an error.
      localStorage.removeItem("authToken");
    }
  },

  verifyEmail: async (email: string, code: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/auth/verify", {
        email,
        code,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Invalid verification code.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },
};
