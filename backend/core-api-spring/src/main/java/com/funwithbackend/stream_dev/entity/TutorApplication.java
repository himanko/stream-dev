package com.funwithbackend.stream_dev.entity;

import com.funwithbackend.stream_dev.entity.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tutor_applications")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TutorApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // ONE-TO-ONE: A user should only have one active application at a time
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String coverLetter;

    private String resumeUrl;      // Optional link to their LinkedIn or PDF
    private String sampleVideoUrl; // The critical proof they can actually teach!

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(updatable = false)
    private LocalDateTime appliedAt = LocalDateTime.now();

    private LocalDateTime reviewedAt;
}