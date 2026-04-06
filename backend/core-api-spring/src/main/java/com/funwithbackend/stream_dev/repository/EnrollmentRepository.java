package com.funwithbackend.stream_dev.repository;

import com.funwithbackend.stream_dev.entity.Enrollment;
import com.funwithbackend.stream_dev.entity.enums.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {

    // 1. THE DASHBOARD QUERY: Get all courses to show on the React "My Courses" page
    List<Enrollment> findAllByUserIdAndStatus(UUID userId, EnrollmentStatus status);

    // 2. THE BOUNCER CHECK: Returns true/false incredibly fast. Used before serving a video.
    boolean existsByUserIdAndCourseIdAndStatus(UUID userId, UUID courseId, EnrollmentStatus status);

    // 3. THE DETAILS QUERY: Get the exact enrollment record to update it (e.g., if they ask for a refund)
    Optional<Enrollment> findByUserIdAndCourseId(UUID userId, UUID courseId);
}