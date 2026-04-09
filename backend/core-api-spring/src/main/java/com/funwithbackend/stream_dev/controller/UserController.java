package com.funwithbackend.stream_dev.controller;

import com.funwithbackend.stream_dev.entity.UserProfile;
import com.funwithbackend.stream_dev.dto.response.UserProfileResponse; // <-- Added the DTO import
import com.funwithbackend.stream_dev.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // --- 1. FETCH PROFILE ---
    // The frontend calls GET /api/profiles/me
    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(Authentication authentication) {
        // If the request makes it past your JwtAuthFilter, authentication is valid
        String email = authentication.getName();

        try {
            // Changed to UserProfileResponse DTO
            UserProfileResponse profileResponse = userService.getStudentProfile(email);
            return ResponseEntity.ok(profileResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // --- 2. UPDATE PROFILE ---
    // The frontend calls PUT /api/profiles/me with the new JSON data
    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(Authentication authentication, @RequestBody UserProfile updatedData) {
        String email = authentication.getName();

        try {
            // Changed to UserProfileResponse DTO
            UserProfileResponse updatedProfileResponse = userService.updateProfile(email, updatedData);
            return ResponseEntity.ok(updatedProfileResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}