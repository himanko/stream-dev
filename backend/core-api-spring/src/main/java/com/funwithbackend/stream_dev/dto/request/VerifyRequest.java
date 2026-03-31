package com.funwithbackend.stream_dev.dto.request;

public record VerifyRequest(
        String email,
        String code
) {}