package com.funwithbackend.stream_dev.dto.request;

import java.util.UUID;

public record VideoUploadRequest(
        UUID lessonId,
        String fileName,
        Long fileSize,
        String contentType // e.g., "video/mp4"
) {}