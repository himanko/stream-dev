package com.funwithbackend.stream_dev.service;

import com.funwithbackend.stream_dev.entity.User;
import com.funwithbackend.stream_dev.entity.UserProfile;
import com.funwithbackend.stream_dev.repository.UserProfileRepository;
import com.funwithbackend.stream_dev.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    // 1. Fetch the profile for the frontend display
    public UserProfile getStudentProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return userProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
    }

    // 2. Update the profile with new data from React
    @Transactional
    public UserProfile updateProfile(String email, UserProfile updatedData) {
        // Find the existing profile
        UserProfile existingProfile = getStudentProfile(email);

        // Update the allowed editable fields
        existingProfile.setHeadline(updatedData.getHeadline());
        existingProfile.setBio(updatedData.getBio());
        existingProfile.setLocation(updatedData.getLocation());
        existingProfile.setPreferredLanguage(updatedData.getPreferredLanguage());
        existingProfile.setGithubUrl(updatedData.getGithubUrl());
        existingProfile.setLinkedinUrl(updatedData.getLinkedinUrl());
        existingProfile.setPortfolioUrl(updatedData.getPortfolioUrl());
        existingProfile.setPublicProfile(updatedData.isPublicProfile());

        // Note: We intentionally DO NOT update stats like watch time or streaks here.
        // Those are system-calculated, keeping the data secure from frontend manipulation.

        return userProfileRepository.save(existingProfile);
    }
}