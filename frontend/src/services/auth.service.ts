import axios from "axios";
import { api } from "./api";

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
};
