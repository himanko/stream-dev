package com.funwithbackend.stream_dev.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Look for the "Authorization" header in the incoming request
        final String authHeader = request.getHeader("Authorization");

        // 2. If there is no header, or it doesn't start with "Bearer ", just pass it along (it might be a public route)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Extract the token (Remove "Bearer " from the string)
        final String jwt = authHeader.substring(7);

        // 4. If the token is cryptographically valid, log the user in to the Spring Security Context
        if (jwtProvider.validateToken(jwt)) {
            String email = jwtProvider.getEmailFromToken(jwt);

            // Create a temporary UserDetails object so Spring knows who is making the request
            UserDetails userDetails = User.withUsername(email)
                    .password("") // Password isn't needed here because the token is already verified
                    .authorities(Collections.emptyList())
                    .build();

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Officially authenticate the user for this single request
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        // 5. Continue to the next step in the chain (like fetching the video)
        filterChain.doFilter(request, response);
    }
}