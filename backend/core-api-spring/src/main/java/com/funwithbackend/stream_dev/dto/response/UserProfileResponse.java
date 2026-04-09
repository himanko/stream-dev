package com.funwithbackend.stream_dev.dto.response;

import java.time.LocalDateTime;

public record UserProfileResponse(
        // Identity (Sourced from User table)
        Long id,
        String username,
        String email,
        String fullName,

        // Profile Data (Sourced from UserProfile table)
        String profilePictureUrl,
        String headline,
        String location,
        String preferredLanguage,
        String bio,

        // Links
        String portfolioUrl,
        String githubUrl,
        String linkedinUrl,

        // Settings & Gamification
        boolean isPublicProfile,
        boolean receivesAlerts,
        long totalWatchTimeMinutes,
        int currentStreak,

        // Global Status
        boolean isPremium,// Sourced from User table

        // Add these two lines to the bottom of your DTO record:
        Boolean isOnline,
        LocalDateTime lastActiveAt

) {}