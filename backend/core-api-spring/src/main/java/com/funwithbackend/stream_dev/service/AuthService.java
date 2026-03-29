package com.funwithbackend.stream_dev.service;

import com.funwithbackend.stream_dev.entity.Role;
import com.funwithbackend.stream_dev.entity.User;
import com.funwithbackend.stream_dev.repository.UserRepository;
import com.funwithbackend.stream_dev.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Transactional
    public User registerStudent(String email, String password, String name) {
        // 1. Check if the email is already in use
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        // 2. Build and save the new user
        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password)) // Secure BCrypt hashing
                .fullName(name)
                .role(Role.ROLE_STUDENT) // Default role for your tutoring site
                .provider("LOCAL")
                .isEnabled(true)
                .isPremium(false)
                .build();

        return userRepository.save(user);
    }

    public String authenticateStudent(String email, String password) {
        // 1. Find the user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        // 2. Check if the raw password matches the BCrypt hash in PostgreSQL
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        // 3. Generate and return the secure RSA-signed JWT
        return jwtProvider.generateToken(user.getEmail(), user.getRole().name());
    }
}