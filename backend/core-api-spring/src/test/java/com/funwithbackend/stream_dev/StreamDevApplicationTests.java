package com.funwithbackend.stream_dev;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // Forces Spring to use the test configuration
class StreamDevApplicationTests {

    @Test
    void contextLoads() {
        // This is a "Sanity Check" test.
        // If the Spring Boot context can load all your controllers, services,
        // and security filters without crashing, this test passes.
    }
}