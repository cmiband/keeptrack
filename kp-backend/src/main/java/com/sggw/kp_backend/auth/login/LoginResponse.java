package com.sggw.kp_backend.auth.login;

import com.sggw.kp_backend.auth.jwt.Jwt;
import com.sggw.kp_backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LoginResponse {
    private Jwt accessToken;
    private Jwt refreshToken;
    private User userData;
}
