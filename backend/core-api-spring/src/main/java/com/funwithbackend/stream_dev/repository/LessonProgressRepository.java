package com.funwithbackend.stream_dev.repository;

import com.funwithbackend.stream_dev.entity.LessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface LessonProgressRepository extends JpaRepository<LessonProgress, UUID> {

    // Find exactly where a specific user left off on a specific lesson
    Optional<LessonProgress> findByUserIdAndLessonId(UUID userId, UUID lessonId);
}