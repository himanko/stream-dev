package com.stream_dev.bff_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();

        // 1. Explicitly allow your Vite frontend
        corsConfig.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));

        // 2. Explicitly allow all methods, ESPECIALLY OPTIONS (Preflight)
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 3. Allow all headers
        corsConfig.setAllowedHeaders(List.of("*"));

        // 4. MUST be true to allow the HttpOnly Session Cookie
        corsConfig.setAllowCredentials(true);

        // 5. Cache the preflight response for 1 hour so the browser doesn't spam OPTIONS requests
        corsConfig.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply this configuration to EVERY route going through the Gateway
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}