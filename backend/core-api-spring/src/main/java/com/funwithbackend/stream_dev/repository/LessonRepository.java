package com.funwithbackend.stream_dev.repository;
import com.funwithbackend.stream_dev.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface LessonRepository extends JpaRepository<Lesson, UUID> {}