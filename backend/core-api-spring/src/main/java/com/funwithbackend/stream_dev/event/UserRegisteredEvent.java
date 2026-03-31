package com.funwithbackend.stream_dev.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserRegisteredEvent {
    private String email;
    private String verificationCode;
}