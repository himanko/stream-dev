package com.funwithbackend.stream_dev.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// In Java 25, Records automatically generate getters, constructors, and equals/hashcode!
public record LoginRequest(
        @NotBlank(message = "Email cannot be blank")
        @Email(message = "Invalid email format")
        String email,

        @NotBlank(message = "Password cannot be blank")
        String password
) {}