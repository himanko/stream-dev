package com.funwithbackend.stream_dev.entity.enums;

public enum EnrollmentStatus {
    ACTIVE,     // User has full access to the course
    COMPLETED,  // User finished the course (good for issuing certificates!)
    CANCELLED,  // Subscription/Payment failed
    REFUNDED    // User requested their money back, access revoked
}