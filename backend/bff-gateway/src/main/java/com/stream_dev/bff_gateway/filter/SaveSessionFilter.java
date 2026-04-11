package com.stream_dev.bff_gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class SaveSessionFilter extends AbstractGatewayFilterFactory<SaveSessionFilter.Config> {

    public SaveSessionFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> exchange.getSession().flatMap(session -> {

            // THE FIX: Pause the response BEFORE it gets sent back to React
            exchange.getResponse().beforeCommit(() -> {
                String authHeader = exchange.getResponse().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    String token = authHeader.substring(7);
                    session.getAttributes().put("JWT_TOKEN", token);

                    // Hide the token from the browser
                    exchange.getResponse().getHeaders().remove(HttpHeaders.AUTHORIZATION);

                    // Save the session (This is what actually generates the Set-Cookie header!)
                    return session.save();
                }
                return Mono.empty();
            });

            // Continue sending the request to the Core API
            return chain.filter(exchange);
        });
    }

    public static class Config {}
}