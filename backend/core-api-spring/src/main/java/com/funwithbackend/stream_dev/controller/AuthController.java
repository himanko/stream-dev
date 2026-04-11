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
            // 1. Authenticate user using your existing service
            AuthResponse response = authService.login(request);

            // Extract the token (Assuming AuthResponse is a record, use .token(), if it's a class use .getToken())
            String jwt = response.token();

            System.out.println("✅ [CONTROLLER] Login successful, passing token to Gateway Header.");

            // 2. THE BFF HANDSHAKE: Put the JWT in the Header, NOT the body
            return ResponseEntity.ok()
                    .header(org.springframework.http.HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                    .body(Map.of(
                            "status", "success",
                            "message", "Logged in successfully"
                    ));

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


    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        // 1. If there is no token (or invalid token), return 401
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }

        // 2. If the Gateway successfully attached the token, return the user info!
        return ResponseEntity.ok(Map.of(
                "email", authentication.getName(),
                // Safely grab the first role/authority the user has
                "role", authentication.getAuthorities().iterator().next().getAuthority()
        ));
    }
}