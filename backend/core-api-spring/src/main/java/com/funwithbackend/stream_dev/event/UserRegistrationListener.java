package com.funwithbackend.stream_dev.event;

import com.funwithbackend.stream_dev.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserRegistrationListener {

    private final EmailService emailService;

    // @Async tells Spring: "Run this on a completely separate thread!"
    @Async
    @EventListener
    public void handleUserRegistrationEvent(UserRegisteredEvent event) {
        System.out.println("🧵 [ASYNC WORKER] Background thread started for email to: " + event.getEmail());

        // This can take 2-3 seconds, but the user won't feel it!
        emailService.sendVerificationEmail(event.getEmail(), event.getVerificationCode());

        System.out.println("✅ [ASYNC WORKER] Verification email sent successfully!");
    }
}