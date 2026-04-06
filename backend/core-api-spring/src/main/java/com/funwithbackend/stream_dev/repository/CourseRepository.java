package com.funwithbackend.stream_dev.repository;

import com.funwithbackend.stream_dev.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {

    // THE HOMEPAGE QUERY: Only get PUBLIC courses where the premiere date is null OR in the past.
    @Query("SELECT c FROM Course c WHERE c.visibility = 'PUBLIC' AND (c.goLiveAt IS NULL OR c.goLiveAt <= :now)")
    List<Course> findAllPublicAndLiveCourses(@Param("now") LocalDateTime now);

    // FETCH SINGLE COURSE: Good for non-enrolled users browsing a sales page.
    @Query("SELECT c FROM Course c WHERE c.id = :id AND c.visibility = 'PUBLIC' AND (c.goLiveAt IS NULL OR c.goLiveAt <= :now)")
    Optional<Course> findPublicAndLiveCourseById(@Param("id") UUID id, @Param("now") LocalDateTime now);
}