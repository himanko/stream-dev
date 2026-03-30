package com.funwithbackend.stream_dev.repository;

import com.funwithbackend.stream_dev.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Data JPA automatically translates this into:
    // SELECT * FROM users WHERE email = ?
    Optional<User> findByEmail(String email);

    // Useful for checking if a student already has an account before registering
    boolean existsByEmail(String email);

    // This is highly efficient. It updates the timestamp without loading the whole user object.
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.lastActiveAt = :now WHERE u.email = :email")
    void updateLastActiveTime(String email, LocalDateTime now);
}