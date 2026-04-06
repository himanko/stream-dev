package com.funwithbackend.stream_dev.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "lesson_progress",
        uniqueConstraints = {
                // SECURITY: A user can only have ONE progress tracker per lesson.
                @UniqueConstraint(columnNames = {"user_id", "lesson_id"})
        }
)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class LessonProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // FetchType.LAZY is critical here for scale. We don't want to load
    // the massive User object every time we just want to update the timestamp.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    // THE TRACKING DATA
    // We save the exact second they are on. If they close their laptop,
    // they can resume exactly where they left off.
    private Integer watchTimeSeconds = 0;

    private boolean isCompleted = false;

    @Column(nullable = false)
    private LocalDateTime lastWatchedAt = LocalDateTime.now();
}