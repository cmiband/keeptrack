package com.sggw.kp_backend.auth;

import java.time.LocalDate;

public record UserDto(
        Integer id,
        String username,
        String email,
        String firstName,
        String lastName,
        Integer age,
        LocalDate createdDate
) {
}
