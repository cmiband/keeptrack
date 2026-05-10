package com.sggw.kp_backend.auth.jwt;

import com.sggw.kp_backend.auth.UserDto;
import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private UserDto userData;
}
