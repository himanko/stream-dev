package com.funwithbackend.stream_dev.service;

import com.funwithbackend.stream_dev.dto.request.LoginRequest;
import com.funwithbackend.stream_dev.dto.response.AuthResponse;
import com.funwithbackend.stream_dev.entity.Role;
import com.funwithbackend.stream_dev.entity.User;
import com.funwithbackend.stream_dev.entity.UserProfile;
import com.funwithbackend.stream_dev.repository.UserRepository;
import com.funwithbackend.stream_dev.repository.UserProfileRepository;
import com.funwithbackend.stream_dev.security.jwt.BlacklistedToken;
import com.funwithbackend.stream_dev.security.jwt.BlacklistedTokenRepository;
import com.funwithbackend.stream_dev.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.context.ApplicationEventPublisher;
import com.funwithbackend.stream_dev.event.UserRegisteredEvent;
import java.util.Random;

import java.time.LocalDateTime;



@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final BlacklistedTokenRepository blacklistedTokenRepository;
    private final UserProfileRepository userProfileRepository;
    private final ApplicationEventPublisher eventPublisher;


    @Transactional
    public void registerStudent(String email, String password, String name) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already exists!");
        }

        // 1. Generate the 6-digit code (This was missing!)
        String randomCode = String.format("%06d", new Random().nextInt(999999));

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(name)
                .role(Role.ROLE_STUDENT)
                .provider("LOCAL")
                .isEnabled(false) // 🔒 Account locked until verified
                .isPremium(false)
                .online(false)
                .verificationCode(randomCode) // Save the code
                .verificationExpiresAt(LocalDateTime.now().plusMinutes(15)) // Expires in 15 mins
                .build();

        User savedUser = userRepository.save(user);

        UserProfile blankProfile = UserProfile.builder().user(savedUser).build();
        userProfileRepository.save(blankProfile);

        System.out.println("📢 [MAIN THREAD] Publishing email event for: " + email);

        // 2. This will now work because of the new imports
        eventPublisher.publishEvent(new UserRegisteredEvent(email, randomCode));

        System.out.println("🏁 [MAIN THREAD] Registration method finished!");
    }

    public String generateTokenForVerifiedUser(String email) {
        // 1. Fetch the newly verified user from the database
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        // 2. Generate the JWT using your existing JwtProvider!
        return jwtProvider.generateToken(user.getEmail(), user.getRole().name());
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

    public java.util.Map<String, Object> getCurrentUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return java.util.Map.of(
                "email", user.getEmail(),
                "fullName", user.getFullName(),
                "role", user.getRole().name()
        );
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

    @Transactional
    public void verifyEmail(String email, String code) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 1. Check if already verified
        if (user.isEnabled()) {
            throw new IllegalArgumentException("Account is already verified.");
        }

        // 2. Check for expired code
        if (user.getVerificationExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Verification code has expired. Please request a new one.");
        }

        // 3. Check if the code matches
        if (!user.getVerificationCode().equals(code)) {
            throw new IllegalArgumentException("Invalid verification code.");
        }

        // 4. Success! Unlock the account and erase the code for security
        user.setEnabled(true);
        user.setVerificationCode(null);
        user.setVerificationExpiresAt(null);

        userRepository.save(user);

        System.out.println("🔓 [SERVICE] User " + email + " successfully verified and unlocked!");
    }
}