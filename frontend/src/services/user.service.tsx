import { api } from "./api";
import axios from "axios";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  isPremium?: boolean;
}

export const UserService = {
  // 1. Fetch Profile (Already works!)
  getProfile: async (): Promise<UserProfile> => {
    try {
      const response = await api.get<UserProfile>("/profiles/me");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to load profile.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  // 2. NEW: Update Profile
  // We use Partial<UserProfile> because we might not send every single field back
  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      const response = await api.put<UserProfile>("/profiles/me", data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to update profile.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },
};
