package com.stream_dev.bff_gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class ClearSessionFilter extends AbstractGatewayFilterFactory<ClearSessionFilter.Config> {

    public ClearSessionFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            exchange.getResponse().beforeCommit(() -> {

                // Overwrite the cookie with a blank, instantly expiring cookie
                ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", "")
                        .httpOnly(true)
                        .path("/")
                        .maxAge(0)
                        .build();

                exchange.getResponse().addCookie(cookie);
                return Mono.empty();
            });

            return chain.filter(exchange);
        };
    }

    public static class Config {}
}