package com.funwithbackend.stream_dev.service;

import com.funwithbackend.stream_dev.entity.TutorApplication;
import com.funwithbackend.stream_dev.entity.User;
import com.funwithbackend.stream_dev.entity.enums.ApplicationStatus;
import com.funwithbackend.stream_dev.entity.Role;
import com.funwithbackend.stream_dev.repository.TutorApplicationRepository;
import com.funwithbackend.stream_dev.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TutorApplicationService {

    private final TutorApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public TutorApplicationService(TutorApplicationRepository appRepo, UserRepository userRepo) {
        this.applicationRepository = appRepo;
        this.userRepository = userRepo;
    }

    // 1. FOR STUDENTS: Submit a new application
    @Transactional
    public TutorApplication submitApplication(UUID userId, String coverLetter, String resumeUrl, String videoUrl) {
        if (applicationRepository.existsByUserId(userId)) {
            throw new IllegalStateException("You already have an application submitted.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        TutorApplication app = TutorApplication.builder()
                .user(user)
                .coverLetter(coverLetter)
                .resumeUrl(resumeUrl)
                .sampleVideoUrl(videoUrl)
                .status(ApplicationStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        return applicationRepository.save(app);
    }

    // 2. FOR ADMINS: Fetch all pending applications
    public List<TutorApplication> getPendingApplications() {
        return applicationRepository.findAllByStatusOrderByAppliedAtAsc(ApplicationStatus.PENDING);
    }

    // 3. FOR ADMINS: Approve application and upgrade user
    @Transactional
    public void approveApplication(UUID applicationId) {
        TutorApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setStatus(ApplicationStatus.APPROVED);
        app.setReviewedAt(LocalDateTime.now());
        applicationRepository.save(app);

        // Auto-upgrade the user!
        User user = app.getUser();
        if (user.getRole() == Role.ROLE_STUDENT) {
            user.setRole(Role.ROLE_TUTOR);
            userRepository.save(user);
        }
    }
}