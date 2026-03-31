package com.funwithbackend.stream_dev.controller;

import com.funwithbackend.stream_dev.dto.request.LoginRequest;
import com.funwithbackend.stream_dev.dto.request.RegistrationRequest;
import  com.funwithbackend.stream_dev.dto.request.VerifyRequest;
import com.funwithbackend.stream_dev.dto.response.AuthResponse;
import com.funwithbackend.stream_dev.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@Valid @RequestBody RegistrationRequest request) {
        try {
            authService.registerStudent(request.getEmail(), request.getPassword(), request.getFullName());
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of("message", "Registration successful! You can now log in.")
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@Valid @RequestBody LoginRequest request) {
        System.out.println("🚀 [CONTROLLER] Login request received for: " + request.email());
        try {
            // This MUST point to authService.login(request)
            AuthResponse response = authService.login(request);
            System.out.println("✅ [CONTROLLER] Login successful, returning token to React.");
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            System.out.println("❌ [CONTROLLER] Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("error", "Invalid email or password")
            );
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<AuthResponse> verifyEmail(@RequestBody VerifyRequest request) {
        authService.verifyEmail(request.email(), request.code());

        // We don't send a token here either! We force them to officially log in now.
        return ResponseEntity.ok(new AuthResponse("null", "Email verified successfully! You can now log in."));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, Authentication authentication) {
        System.out.println("🚀 [CONTROLLER] Logout endpoint hit!");

        if (authentication == null) {
            System.out.println("❌ [CONTROLLER] Logout failed: Authentication is null (Bouncer blocked it)");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        String authHeader = request.getHeader("Authorization");

        System.out.println("✅ [CONTROLLER] Logout authorized for user: " + email);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            authService.logout(email, jwt);
        } else {
            System.out.println("⚠️ [CONTROLLER] NO VALID BEARER TOKEN FOUND IN HEADER!");
        }

        return ResponseEntity.ok(Map.of("message", "Successfully logged out."));
    }
}