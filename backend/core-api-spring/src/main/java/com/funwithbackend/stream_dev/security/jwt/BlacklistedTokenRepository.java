package com.funwithbackend.stream_dev.security.jwt;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken, Long> {

    // This is the single method our Bouncer needs
    boolean existsByToken(String token);
}