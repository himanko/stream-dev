package com.stream_dev.bff_gateway.filter;


import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;

@Component
public class ClearSessionFilter extends AbstractGatewayFilterFactory<ClearSessionFilter.Config> {

    public ClearSessionFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            // Let the request go to the Core API first (so it can blacklist the token)
            return chain.filter(exchange).then(Mono.defer(() ->
                    // When the response comes back, destroy the Redis session!
                    // Spring Session will automatically tell React to delete the cookie.
                    exchange.getSession().flatMap(WebSession::invalidate)
            ));
        };
    }

    public static class Config {}
}