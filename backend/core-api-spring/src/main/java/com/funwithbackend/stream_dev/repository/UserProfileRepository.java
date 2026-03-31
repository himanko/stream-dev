package com.funwithbackend.stream_dev.repository;

import com.funwithbackend.stream_dev.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    // We find the profile by looking up the User's ID
    Optional<UserProfile> findByUserId(Long userId);
}