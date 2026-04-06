package com.funwithbackend.stream_dev.entity;

import com.funwithbackend.stream_dev.entity.enums.CourseVisibility;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "lessons")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String textNotes; // For your written notes/code snippets!

    @Column(name = "order_index")
    private Integer orderIndex;

    private boolean isFreePreview = false; // Lets non-paying users watch

    // --- THE NEW DRIP CONTENT FEATURES ---
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CourseVisibility visibility = CourseVisibility.DRAFT;

    private LocalDateTime goLiveAt;
    // -------------------------------------

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id", nullable = false)
    private Section section;

    @OneToOne(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private VideoFile videoFile;
}