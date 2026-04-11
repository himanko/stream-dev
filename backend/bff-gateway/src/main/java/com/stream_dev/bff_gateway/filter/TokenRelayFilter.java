package com.stream_dev.bff_gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

@Component
public class TokenRelayFilter extends AbstractGatewayFilterFactory<TokenRelayFilter.Config> {

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            // 1. Get the WebSession from Redis
            return exchange.getSession().flatMap(session -> {
                // 2. Retrieve the JWT we stored during login
                String token = session.getAttribute("JWT_TOKEN");

                if (token != null) {
                    // 3. Mutate the request to add the Authorization Header
                    exchange.getRequest().mutate()
                            .header("Authorization", "Bearer " + token)
                            .build();
                }
                return chain.filter(exchange);
            });
        };
    }

    public static class Config {}
}