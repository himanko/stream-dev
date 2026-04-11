package com.stream_dev.bff_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.server.EnableRedisWebSession;
import org.springframework.web.server.session.CookieWebSessionIdResolver;
import org.springframework.web.server.session.WebSessionIdResolver;

import java.time.Duration; // <-- Add this import

@Configuration
@EnableRedisWebSession
public class RedisConfig {

    @Bean
    public WebSessionIdResolver webSessionIdResolver() {
        CookieWebSessionIdResolver resolver = new CookieWebSessionIdResolver();
        resolver.setCookieName("SESSION_ID");

        resolver.addCookieInitializer(builder -> builder
                .path("/")
                .sameSite("Lax")
                .httpOnly(true)
                .maxAge(Duration.ofDays(30)) // <-- THE NETFLIX MAGIC: Cookie stays for 30 days
        );
        return resolver;
    }
}