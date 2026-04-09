package com.funwithbackend.stream_dev.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The secure link back to the Authentication table
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, unique = true)
    private User user;

    // --- Editable Identity Fields ---
    private String profilePictureUrl;
    private String headline;

    @Column(length = 160)
    private String bio;

    // --- Demographics ---
    // Public: What everyone sees (e.g., "Assam, India")
    private String location;

    // Private: The exact street address or GPS coordinates.
    // This NEVER goes into the UserProfileResponse DTO.
    private String exactAddress;
    private String preferredLanguage; // e.g., "Java", "C++", or "Both"

    // --- Social Links ---
    private String githubUrl;
    private String linkedinUrl;
    private String portfolioUrl;

    // --- Preferences (With safe defaults) ---
    @Builder.Default
    @Column(name = "is_public_profile")
    private boolean isPublicProfile = true;

    @Builder.Default
    @Column(name = "receives_alerts")
    private boolean receivesAlerts = true;

    // --- Gamification Stats (Read-Only for the frontend) ---
    @Builder.Default
    private long totalWatchTimeMinutes = 0;

    @Builder.Default
    private int currentStreak = 0;
}