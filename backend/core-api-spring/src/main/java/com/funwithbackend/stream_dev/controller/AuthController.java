package com.funwithbackend.stream_dev.controller;

import com.funwithbackend.stream_dev.dto.request.LoginRequest;
import com.funwithbackend.stream_dev.dto.request.RegistrationRequest;
import com.funwithbackend.stream_dev.dto.request.VerifyRequest;
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

            // Extract the token
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
    public ResponseEntity<?> verifyEmail(@RequestBody VerifyRequest request) {
        // 1. Verify the code
        authService.verifyEmail(request.email(), request.code());

        // 2. Generate the token for auto-login
        String jwt = authService.generateTokenForVerifiedUser(request.email());

        System.out.println("✅ [CONTROLLER] Verification successful, auto-logging in user.");

        // 3. Staple the JWT to the header exactly like the login endpoint
        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                .body(Map.of(
                        "status", "success",
                        "message", "Email verified successfully! Welcome."
                ));
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
        // 1. Get the email from the validated JWT token
        String email = authentication.getName();

        // 2. Ask the AuthService to fetch and format the user's profile
        // This completely removes the need to import User or UserRepository here!
        return ResponseEntity.ok(authService.getCurrentUserProfile(email));
    }
}