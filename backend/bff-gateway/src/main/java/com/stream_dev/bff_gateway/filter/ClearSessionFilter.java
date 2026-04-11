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
            exchange.getResponse().beforeCommit(() ->
                    exchange.getSession().flatMap(org.springframework.web.server.WebSession::invalidate)
            );
            return chain.filter(exchange);
        };
    }

    public static class Config {}
}