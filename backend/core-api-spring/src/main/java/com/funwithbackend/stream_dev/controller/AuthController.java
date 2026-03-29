package com.funwithbackend.stream_dev.controller;

import com.funwithbackend.stream_dev.dto.request.LoginRequest;
import com.funwithbackend.stream_dev.dto.request.RegistrationRequest;
import com.funwithbackend.stream_dev.dto.response.AuthResponse;
import com.funwithbackend.stream_dev.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
// Opens the door for your React app (Create React App uses 3000, Vite uses 5173)
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    private final AuthService authService;

    // --- 1. REGISTRATION ENDPOINT ---
    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@Valid @RequestBody RegistrationRequest request) {
        try {
            // Note: If you made RegistrationRequest a Java Record, change .getEmail() to .email()
            authService.registerStudent(
                    request.getEmail(),
                    request.getPassword(),
                    request.getFullName()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of("message", "Registration successful! You can now log in.")
            );

        } catch (IllegalArgumentException e) {
            // Catches the "Email already exists" error from the AuthService
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("error", e.getMessage())
            );
        }
    }

    // --- 2. LOGIN ENDPOINT ---
    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@Valid @RequestBody LoginRequest request) {
        try {
            // Using Java Record syntax (.email() instead of .getEmail())
            String token = authService.authenticateStudent(request.email(), request.password());

            // Returns the JWT token to the React frontend
            return ResponseEntity.ok(new AuthResponse(token, "Login successful!"));

        } catch (IllegalArgumentException e) {
            // Generic message so attackers don't know if the email or password was wrong
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("error", "Invalid email or password")
            );
        }
    }
}