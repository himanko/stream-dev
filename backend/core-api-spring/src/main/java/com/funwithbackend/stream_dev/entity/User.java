package com.funwithbackend.stream_dev.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password; // Nullable for Google/Facebook users

    private String fullName;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Social Login Details
    private String provider; // "GOOGLE", "FACEBOOK", "LOCAL"
    private String providerId;

    // Security & Business logic
    private boolean isEnabled = true;
    private boolean isPremium = false; // For your "DM Tutor" subscription
}