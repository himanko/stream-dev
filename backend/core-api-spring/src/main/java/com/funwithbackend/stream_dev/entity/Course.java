package com.funwithbackend.stream_dev.entity;

import com.funwithbackend.stream_dev.entity.enums.CourseVisibility;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "courses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Double price; // If null or 0.0, it's free

    // 1. THE NEW VISIBILITY STATUS
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CourseVisibility visibility = CourseVisibility.DRAFT;

    // 2. THE PREMIERE DATE (The Calendar Feature!)
    private LocalDateTime goLiveAt;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Section> sections = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}