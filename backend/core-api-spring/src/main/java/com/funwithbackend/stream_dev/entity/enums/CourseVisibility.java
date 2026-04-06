package com.funwithbackend.stream_dev.entity.enums;

public enum CourseVisibility {
    DRAFT,      // Hidden from everyone. You are still uploading videos.
    PRIVATE,    // Hidden from the public catalog, but accessible via a secret direct link.
    PUBLIC      // Visible to the whole world on your main homepage.
}