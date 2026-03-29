package com.funwithbackend.stream_dev.dto.response;

// Java 25 Record: A fast, immutable data carrier
public record AuthResponse(
        String token,
        String message
) {}