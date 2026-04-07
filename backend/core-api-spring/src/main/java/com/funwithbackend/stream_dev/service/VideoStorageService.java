package com.funwithbackend.stream_dev.service;

import com.funwithbackend.stream_dev.dto.response.VideoUploadRequestResponse;
import com.funwithbackend.stream_dev.entity.Lesson;
import com.funwithbackend.stream_dev.entity.VideoFile;
import com.funwithbackend.stream_dev.repository.LessonRepository;
import com.funwithbackend.stream_dev.repository.VideoFileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.UUID;

@Service
public class VideoStorageService {

    private final S3Presigner s3Presigner;
    private final VideoFileRepository videoFileRepository;
    private final LessonRepository lessonRepository;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public VideoStorageService(S3Presigner s3Presigner, VideoFileRepository videoRepo, LessonRepository lessonRepo) {
        this.s3Presigner = s3Presigner;
        this.videoFileRepository = videoRepo;
        this.lessonRepository = lessonRepo;
    }

    // PHASE 1: Generate the URL and create the "UPLOADING" database record
    @Transactional
    public VideoUploadRequestResponse requestUploadUrl(UUID lessonId, String fileName, Long fileSize, String contentType) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        String extension = fileName != null && fileName.contains(".") ? fileName.substring(fileName.lastIndexOf(".")) : ".mp4";
        String s3ObjectKey = "courses/videos/" + UUID.randomUUID() + extension;

        // 1. Save the initial state to the Database
        VideoFile videoFile = VideoFile.builder()
                .originalFileName(fileName)
                .s3ObjectKey(s3ObjectKey)
                .sizeInBytes(fileSize)
                .status("UPLOADING") // Crucial: It is NOT ready yet!
                .lesson(lesson)
                .build();
        videoFile = videoFileRepository.save(videoFile);

        // 2. Build the AWS Request
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(s3ObjectKey)
                .contentType(contentType)
                .build();

        // 3. Generate a signature valid for exactly 60 minutes
        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(60))
                .putObjectRequest(objectRequest)
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(presignRequest);

        // 4. Send the URL back to React
        return new VideoUploadRequestResponse(
                videoFile.getId(),
                presignedRequest.url().toString(),
                s3ObjectKey
        );
    }

    // PHASE 2: React calls this when the direct-to-S3 upload hits 100%
    @Transactional
    public void confirmUploadComplete(UUID videoFileId) {
        VideoFile videoFile = videoFileRepository.findById(videoFileId)
                .orElseThrow(() -> new RuntimeException("Video record not found"));

        // If you were using AWS MediaConvert to transcode to 1080p/720p,
        // you would trigger that job here and set status to "PROCESSING".
        // For now, we set it straight to READY.
        videoFile.setStatus("READY");
        videoFileRepository.save(videoFile);
    }
}