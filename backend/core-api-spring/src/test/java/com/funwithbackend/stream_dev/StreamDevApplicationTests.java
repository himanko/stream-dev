package com.funwithbackend.stream_dev;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean; // 🚀 The new modern import!
import org.springframework.mail.javamail.JavaMailSender;

@SpringBootTest
class StreamDevApplicationTests {

    // 🚀 We use @MockitoBean for modern Spring Boot versions
    @MockitoBean
    private JavaMailSender javaMailSender;

    @Test
    void contextLoads() {
    }
}