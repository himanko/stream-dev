package com.funwithbackend.stream_dev.entity;

import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- NEW: Added Username so the frontend has something to display! ---
    @Column(unique = true)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    private String password; // Nullable for Google/Facebook users

    private String fullName;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Social Login Details
    private String provider; // "GOOGLE", "FACEBOOK", "LOCAL"
    private String providerId;

    // Explicit Login/Logout status
    @Builder.Default
    @Column(name = "is_online", nullable = false)
    private Boolean online = false;

    // --- Verification Fields ---
    private String verificationCode;
    private LocalDateTime verificationExpiresAt;

    // The Heartbeat (Exact last action)
    @Column(name = "last_active_at")
    private LocalDateTime lastActiveAt;

    // Automatically sets the timestamp when the user first registers
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Security & Business logic
    @Builder.Default
    private boolean isEnabled = true;

    @Builder.Default
    private boolean isPremium = false; // For your "DM Tutor" subscription

    // --- FIXED METHOD ---
    // Spring Security strictly requires this to return a String.
    public String getUsername() {
        // If they haven't set a custom username yet, default to their email
        // This prevents massive NullPointerExceptions in your JWT token generation!
        return this.username != null ? this.username : this.email;
    }
}