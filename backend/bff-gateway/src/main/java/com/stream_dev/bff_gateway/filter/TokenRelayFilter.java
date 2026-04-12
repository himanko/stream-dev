package com.stream_dev.bff_gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class TokenRelayFilter extends AbstractGatewayFilterFactory<TokenRelayFilter.Config> {

    public TokenRelayFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {

            // 1. Check if the browser sent our HttpOnly cookie
            HttpCookie authCookie = exchange.getRequest().getCookies().getFirst("AUTH_TOKEN");

            if (authCookie != null) {
                String token = authCookie.getValue();

                // 2. Staple the token to the Authorization header
                var mutatedRequest = exchange.getRequest().mutate()
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .build();

                var mutatedExchange = exchange.mutate().request(mutatedRequest).build();

                // 3. Forward to Core API
                return chain.filter(mutatedExchange);
            }

            // No cookie found, proceed normally (will trigger 401)
            return chain.filter(exchange);
        };
    }

    public static class Config {}
}