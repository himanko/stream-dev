package com.funwithbackend.stream_dev.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "video_files")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class VideoFile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String originalFileName; // "my_cpp_tutorial_final_v2.mp4"

    @Column(nullable = false, unique = true)
    private String s3ObjectKey; // Secure AWS ID: "videos/abc-123.mp4"

    private Long sizeInBytes;
    private Double durationInSeconds;

    // Status can be: UPLOADING, PROCESSING, READY, FAILED
    @Column(nullable = false)
    private String status = "UPLOADING";

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;
}