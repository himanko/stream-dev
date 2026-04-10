import { api } from "./api";
import axios from "axios";

export interface TutorDashboardStats {
  totalRevenue: number;
  activeStudents: number;
  averageRating: number;
  totalWatchTimeHours: number;
  revenueTrendPercentage: number;
}

export interface BankDetails {
  accountName: string;
  accountNumberMasked: string;
  bankName: string;
  ifscCode: string;
  isVerified: boolean;
}

export const TutorService = {
  // Fetch high-level KPIs for the Performance Dashboard
  getDashboardStats: async (
    timeRange: string = "30d",
  ): Promise<TutorDashboardStats> => {
    try {
      const response = await api.get<TutorDashboardStats>(
        `/tutor/analytics/summary?range=${timeRange}`,
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to load dashboard statistics.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  // Fetch configured bank details for payouts
  getBankDetails: async (): Promise<BankDetails> => {
    try {
      const response = await api.get<BankDetails>(
        "/tutor/billing/bank-details",
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to load bank details.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  // Update bank details
  updateBankDetails: async (
    data: Partial<BankDetails>,
  ): Promise<BankDetails> => {
    try {
      const response = await api.put<BankDetails>(
        "/tutor/billing/bank-details",
        data,
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to update bank details.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },
};
