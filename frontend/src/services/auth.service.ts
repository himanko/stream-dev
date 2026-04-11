import axios from "axios";
import { api } from "./api";
import type { User } from "@/hooks/use-auth"; // <-- Just add the word 'type'!

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

// 2. Updated to use the strict User type
export interface AuthResponse {
  message: string;
  user?: User; // <-- TypeScript now knows this includes name and role!
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
      // The browser automatically sends the secure cookie to verify who is logging out.
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Error logging out", error);
    }
    // 3. Removed the localStorage.removeItem block!
    // State clearing and redirects are now handled beautifully by your useAuth hook.
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
