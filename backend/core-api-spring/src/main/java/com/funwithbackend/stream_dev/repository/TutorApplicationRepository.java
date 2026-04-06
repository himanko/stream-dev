package com.funwithbackend.stream_dev.repository;

import com.funwithbackend.stream_dev.entity.TutorApplication;
import com.funwithbackend.stream_dev.entity.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TutorApplicationRepository extends JpaRepository<TutorApplication, UUID> {

    // For the Admin Dashboard: Fetch all applications that need reviewing
    List<TutorApplication> findAllByStatusOrderByAppliedAtAsc(ApplicationStatus status);

    // To prevent spam: Check if a user already has an application
    boolean existsByUserId(UUID userId);

    // To fetch a user's specific application status
    Optional<TutorApplication> findByUserId(UUID userId);
}