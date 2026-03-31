package com.funwithbackend.stream_dev.controller;

import com.funwithbackend.stream_dev.entity.UserProfile;
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
        // If the request makes it past your JwtAuthFilter, authentication is guaranteed to be valid
        String email = authentication.getName();

        try {
            UserProfile profile = userService.getStudentProfile(email);
            return ResponseEntity.ok(profile);
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
            UserProfile savedProfile = userService.updateProfile(email, updatedData);
            return ResponseEntity.ok(savedProfile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}