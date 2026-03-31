package com.funwithbackend.stream_dev.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j // 🚀 Adds the 'log' variable for professional server logging
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String code) {
        try {
            // 1. Create a MIME Message (Allows HTML and advanced formatting)
            MimeMessage message = mailSender.createMimeMessage();

            // 2. Use the Helper to construct the email (true = multipart/HTML enabled)
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // --- Sandbox Mode 'From' Address ---
            helper.setFrom("onboarding@resend.dev");
            helper.setTo(to);
            helper.setSubject("Verify your StreamDev Account");

            // 3. The Beautiful HTML Template (Using Java Text Blocks)
            String htmlContent = """
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #ffffff;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #111827; margin: 0; font-size: 28px;">StreamDev</h1>
                            <p style="color: #6b7280; font-size: 16px; margin-top: 5px;">Secure Account Verification</p>
                        </div>
                        
                        <p style="color: #374151; font-size: 16px; line-height: 1.6;">Hello,</p>
                        <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for registering. To complete your setup and secure your account, please enter the following 6-digit verification code in your browser:</p>
                        
                        <div style="text-align: center; margin: 35px 0;">
                            <span style="display: inline-block; padding: 16px 32px; background-color: #f3f4f6; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111827; border: 2px dashed #d1d5db;">
                                %s
                            </span>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea;">
                            This code will expire in 15 minutes.<br>
                            If you did not request this email, you can safely ignore it.
                        </p>
                    </div>
                    """.formatted(code); // Injects the code directly into the %s placeholder

            // 4. Attach the HTML to the email (true = isHtml)
            helper.setText(htmlContent, true);

            // 5. Send it!
            mailSender.send(message);
            log.info("✅ Verification email successfully sent to: {}", to);

        } catch (MessagingException e) {
            log.error("❌ Failed to send verification email to: {}", to, e);
            throw new IllegalStateException("Failed to send email. Please try again later.");
        }
    }
}