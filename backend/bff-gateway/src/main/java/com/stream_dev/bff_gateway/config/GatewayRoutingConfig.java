package com.stream_dev.bff_gateway.config;

import com.stream_dev.bff_gateway.filter.ClearSessionFilter;
import com.stream_dev.bff_gateway.filter.SaveSessionFilter;
import com.stream_dev.bff_gateway.filter.TokenRelayFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutingConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder,
                                           SaveSessionFilter saveSessionFilter,
                                           TokenRelayFilter tokenRelayFilter,
                                           ClearSessionFilter clearSessionFilter) {
        return builder.routes()

                // ROUTE 1: Login (Intercepts token and saves to Redis)
                .route("auth-login-route", r -> r
                        .path("/api/auth/login")
                        .filters(f -> f.filter(saveSessionFilter.apply(new SaveSessionFilter.Config())))
                        .uri("http://localhost:8081"))

                // ROUTE 2: Logout (Deletes Redis Session)
                .route("auth-logout-route", r -> r
                        .path("/api/auth/logout")
                        .filters(f -> f
                                .filter(tokenRelayFilter.apply(new TokenRelayFilter.Config()))
                                .filter(clearSessionFilter.apply(new ClearSessionFilter.Config()))
                        )
                        .uri("http://localhost:8081"))

                // ROUTE 3: The Catch-All for everything else (/register, /me, etc)
                .route("core-api-route", r -> r
                        .path("/api/**")
                        .filters(f -> f.filter(tokenRelayFilter.apply(new TokenRelayFilter.Config())))
                        .uri("http://localhost:8081"))

                .build();
    }
}