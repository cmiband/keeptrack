package com.sggw.kp_backend.auth;

import com.sggw.kp_backend.auth.jwt.Jwt;
import com.sggw.kp_backend.auth.jwt.JwtService;
import com.sggw.kp_backend.auth.login.LoginRequest;
import com.sggw.kp_backend.auth.login.LoginResponse;
import com.sggw.kp_backend.user.User;
import com.sggw.kp_backend.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        var principal = authentication.getPrincipal();
        if (principal == null || "anonymousUser".equals(principal)) {
            return null;
        }

        Integer userId;
        if (principal instanceof Integer intId) {
            userId = intId;
        } else if (principal instanceof Long longId) {
            userId = Math.toIntExact(longId);
        } else if (principal instanceof String text) {
            try {
                userId = Integer.parseInt(text);
            } catch (NumberFormatException ex) {
                return null;
            }
        } else {
            return null;
        }

        return userRepository.findById(userId).orElse(null);
    }

    public LoginResponse login(LoginRequest request) {
        var user = userRepository.findByEmail(request.getEmail());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return new LoginResponse(accessToken, refreshToken);
    }

    public Jwt refreshAccessToken(String refreshToken) {
        var jwt = jwtService.parseToken(refreshToken);
        if (jwt == null || jwt.isExpired()) {
            throw new BadCredentialsException("Invalid refresh token or expired.");
        }

        var userId = Math.toIntExact(jwt.getUserId());
        var user = userRepository.findById(userId).orElseThrow();
        return jwtService.generateAccessToken(user);
    }
}
