package com.funwithbackend.stream_dev.service;

import com.funwithbackend.stream_dev.dto.request.LoginRequest;
import com.funwithbackend.stream_dev.dto.response.AuthResponse;
import com.funwithbackend.stream_dev.entity.Role;
import com.funwithbackend.stream_dev.entity.User;
import com.funwithbackend.stream_dev.repository.UserRepository;
import com.funwithbackend.stream_dev.security.jwt.BlacklistedToken;
import com.funwithbackend.stream_dev.security.jwt.BlacklistedTokenRepository;
import com.funwithbackend.stream_dev.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final BlacklistedTokenRepository blacklistedTokenRepository;

    @Transactional
    public void registerStudent(String email, String password, String name) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already exists!");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(name)
                .role(Role.ROLE_STUDENT)
                .provider("LOCAL")
                .isEnabled(true)
                .isPremium(false)
                .online(false)
                .build();

        userRepository.save(user);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        System.out.println("🚀 [SERVICE] Login method started...");

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password.");
        }

        System.out.println("✅ [SERVICE] Password matched! Updating database to ONLINE...");

        user.setOnline(true);
        user.setLastActiveAt(LocalDateTime.now());
        userRepository.saveAndFlush(user); // Force the save instantly

        System.out.println("💾 [SERVICE] Database flush complete!");

        String token = jwtProvider.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, "Login successful!");
    }

    @Transactional
    public void logout(String email, String jwtToken) {
        System.out.println("🚀 [SERVICE] Logout method started...");

        User user = userRepository.findByEmail(email).orElseThrow();
        user.setOnline(false);
        user.setLastActiveAt(LocalDateTime.now());
        userRepository.saveAndFlush(user);

        System.out.println("💾 [SERVICE] Database status set to OFFLINE.");

        BlacklistedToken blacklistedToken = BlacklistedToken.builder()
                .token(jwtToken)
                .build();
        blacklistedTokenRepository.saveAndFlush(blacklistedToken);

        System.out.println("🛑 [SERVICE] Token saved to blacklist table.");
    }
}