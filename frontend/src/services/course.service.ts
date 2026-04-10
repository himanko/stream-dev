import { api } from "./api";
import axios from "axios";

// --- INTERFACES ---
export interface Lesson {
  id: string;
  title: string;
  sortOrder: number;
  lessonType: "VIDEO" | "DOCUMENT";
  mediaFileId?: string; // Links to S3 Object ID
  durationSeconds?: number;
  isFreePreview: boolean;
}

export interface Section {
  id: string;
  title: string;
  sortOrder: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  status: "DRAFT" | "PENDING" | "PUBLISHED";
  price: number;
  totalStudents: number;
  totalRevenue: number;
  thumbnailUrl?: string;
  sections?: Section[]; // Included when fetching full curriculum
}

// --- SERVICE IMPLEMENTATION ---
export const CourseService = {
  // -----------------------------------------------------
  // 1. COURSE LEVEL OPERATIONS
  // -----------------------------------------------------

  // Get all courses for the EC2-style list table
  getAllCourses: async (): Promise<Course[]> => {
    try {
      const response = await api.get<Course[]>("/tutor/courses");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to load courses.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  // Create a new empty course instance
  createCourse: async (title: string, price: number): Promise<Course> => {
    try {
      const response = await api.post<Course>("/tutor/courses", {
        title,
        price,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to create course.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  // Update course status (e.g., Publish or Stop)
  updateCourseStatus: async (
    courseId: string,
    status: string,
  ): Promise<Course> => {
    try {
      const response = await api.patch<Course>(
        `/tutor/courses/${courseId}/status`,
        { status },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to update course status.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  // -----------------------------------------------------
  // 2. CURRICULUM LEVEL OPERATIONS (Sections & Lessons)
  // -----------------------------------------------------

  // Fetch the entire tree (Sections + Lessons) for the Curriculum Editor
  getCurriculum: async (courseId: string): Promise<Section[]> => {
    try {
      const response = await api.get<Section[]>(
        `/tutor/courses/${courseId}/curriculum`,
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to load curriculum.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  // Create a new section (e.g., "Section 1: Introduction")
  createSection: async (courseId: string, title: string): Promise<Section> => {
    try {
      const response = await api.post<Section>(
        `/tutor/courses/${courseId}/sections`,
        { title },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to create section.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  // Add an empty lesson to a section
  createLesson: async (
    sectionId: string,
    data: Partial<Lesson>,
  ): Promise<Lesson> => {
    try {
      const response = await api.post<Lesson>(
        `/tutor/sections/${sectionId}/lessons`,
        data,
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to create lesson.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },

  // -----------------------------------------------------
  // 3. MEDIA MAPPING OPERATION
  // -----------------------------------------------------

  // Link a video from the Media Library (S3) to a specific lesson
  linkMediaToLesson: async (
    lessonId: string,
    mediaFileId: string,
  ): Promise<Lesson> => {
    try {
      const response = await api.patch<Lesson>(
        `/tutor/lessons/${lessonId}/media`,
        { mediaFileId },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || "Failed to link media to lesson.",
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  },
};
