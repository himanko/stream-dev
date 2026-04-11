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
        return (exchange, chain) -> exchange.getSession().flatMap(session ->
                // 1. Let the request pass to the Core API
                chain.filter(exchange).then(Mono.defer(() -> {

                    // 2. When the response comes BACK, check for the Authorization header
                    String authHeader = exchange.getResponse().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

                    if (authHeader != null && authHeader.startsWith("Bearer ")) {
                        // 3. Extract the JWT and save it to Redis
                        String token = authHeader.substring(7);
                        session.getAttributes().put("JWT_TOKEN", token);

                        // 4. STRIP the header! (React must never see this)
                        exchange.getResponse().getHeaders().remove(HttpHeaders.AUTHORIZATION);

                        // 5. Save the session (This triggers the Set-Cookie for React)
                        return session.save();
                    }
                    return Mono.empty();
                }))
        );
    }

    public static class Config {}
}