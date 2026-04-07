package com.funwithbackend.stream_dev.controller;

import com.funwithbackend.stream_dev.dto.request.VideoUploadRequest;
import com.funwithbackend.stream_dev.dto.response.VideoUploadRequestResponse;
import com.funwithbackend.stream_dev.service.VideoStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoStorageService videoStorageService;

    public VideoController(VideoStorageService videoStorageService) {
        this.videoStorageService = videoStorageService;
    }

    // 1. FRONTEND ASKS FOR UPLOAD PERMISSION
    @PreAuthorize("hasRole('TUTOR') or hasRole('ADMIN')")
    @PostMapping("/request-upload")
    public ResponseEntity<VideoUploadRequestResponse> requestUploadUrl(@RequestBody VideoUploadRequest request) {

        VideoUploadRequestResponse response = videoStorageService.requestUploadUrl(
                request.lessonId(),
                request.fileName(),
                request.fileSize(),
                request.contentType()
        );

        return ResponseEntity.ok(response);
    }

    // 2. FRONTEND CONFIRMS UPLOAD TO AWS IS 100% COMPLETE
    @PreAuthorize("hasRole('TUTOR') or hasRole('ADMIN')")
    @PostMapping("/{videoId}/confirm-upload")
    public ResponseEntity<String> confirmUpload(@PathVariable UUID videoId) {
        videoStorageService.confirmUploadComplete(videoId);
        return ResponseEntity.ok("Video upload confirmed and status updated to READY.");
    }
}