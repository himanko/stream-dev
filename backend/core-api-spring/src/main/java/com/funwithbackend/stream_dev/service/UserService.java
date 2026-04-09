package com.funwithbackend.stream_dev.service;

import com.funwithbackend.stream_dev.entity.User;
import com.funwithbackend.stream_dev.entity.UserProfile;
import com.funwithbackend.stream_dev.dto.response.UserProfileResponse;
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

    public UserProfileResponse getStudentProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserProfile profile = userProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));

        return new UserProfileResponse(
                profile.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                profile.getProfilePictureUrl(),
                profile.getHeadline(),
                profile.getLocation(),
                profile.getPreferredLanguage(),
                profile.getBio(),
                profile.getPortfolioUrl(),
                profile.getGithubUrl(),
                profile.getLinkedinUrl(),
                profile.isPublicProfile(),
                profile.isReceivesAlerts(),
                profile.getTotalWatchTimeMinutes(),
                profile.getCurrentStreak(),
                user.isPremium(),
                user.getOnline(),      // <--- 18th item (Must be Boolean)
                user.getLastActiveAt()
        );
    }

    @Transactional
    public UserProfileResponse updateProfile(String email, UserProfile updatedData) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserProfile existingProfile = userProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));

        // ONLY update fields the user is allowed to change!
        existingProfile.setProfilePictureUrl(updatedData.getProfilePictureUrl());
        existingProfile.setHeadline(updatedData.getHeadline());
        existingProfile.setLocation(updatedData.getLocation());
        existingProfile.setPreferredLanguage(updatedData.getPreferredLanguage());
        existingProfile.setBio(updatedData.getBio());
        existingProfile.setPortfolioUrl(updatedData.getPortfolioUrl());
        existingProfile.setGithubUrl(updatedData.getGithubUrl());
        existingProfile.setLinkedinUrl(updatedData.getLinkedinUrl());
        existingProfile.setPublicProfile(updatedData.isPublicProfile());
        existingProfile.setReceivesAlerts(updatedData.isReceivesAlerts());

        userProfileRepository.save(existingProfile);

        return getStudentProfile(email);
    }
}