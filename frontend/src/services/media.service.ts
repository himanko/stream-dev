// src/services/media.service.ts
import { api } from "./api";

export interface MediaObject {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  s3Key: string;
  thumbnailUrl?: string;
  status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
  transcodingProgress: number;
  duration?: number; // in seconds
  createdAt: string;
}

export const MediaService = {
  // Get all media for the logged-in tutor
  getLibrary: async (): Promise<MediaObject[]> => {
    const response = await api.get("/tutor/media");
    return response.data;
  },

  // Delete an object from S3 and DB
  deleteObject: async (id: string): Promise<void> => {
    await api.delete(`/tutor/media/${id}`);
  },

  // Get a pre-signed S3 URL for direct upload
  getPresignedUrl: async (fileName: string, fileType: string) => {
    const response = await api.post("/tutor/media/upload-url", {
      fileName,
      fileType,
    });
    return response.data; // Should return { url, s3Key }
  },
};
