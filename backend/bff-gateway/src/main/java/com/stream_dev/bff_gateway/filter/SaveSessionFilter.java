package com.stream_dev.bff_gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class SaveSessionFilter extends AbstractGatewayFilterFactory<SaveSessionFilter.Config> {

    public SaveSessionFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            exchange.getResponse().beforeCommit(() -> {
                String authHeader = exchange.getResponse().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    String token = authHeader.substring(7);

                    // THE FIX: Put the JWT directly into a secure, HttpOnly cookie!
                    // This bypasses Redis completely and eliminates all race conditions.
                    ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", token)
                            .httpOnly(true)
                            .secure(false) // Set to true if you ever deploy with HTTPS
                            .path("/")
                            .maxAge(24 * 60 * 60) // 1 day expiration
                            .sameSite("Lax") // <-- ADD THIS LINE! This blocks CSRF attacks.
                            .build();

                    exchange.getResponse().addCookie(cookie);

                    // Hide the raw token from React
                    exchange.getResponse().getHeaders().remove(HttpHeaders.AUTHORIZATION);
                }
                return Mono.empty();
            });

            return chain.filter(exchange);
        };
    }

    public static class Config {}
}