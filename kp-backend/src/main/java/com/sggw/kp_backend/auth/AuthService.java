package com.sggw.kp_backend.auth;

import com.sggw.kp_backend.auth.jwt.Jwt;
import com.sggw.kp_backend.auth.jwt.JwtService;
import com.sggw.kp_backend.auth.login.LoginRequest;
import com.sggw.kp_backend.auth.login.LoginResponse;
import com.sggw.kp_backend.user.User;
import com.sggw.kp_backend.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
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
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByUsername(request.getUsername());
        if (user == null) {
            throw new BadCredentialsException("Invalid username or password");
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
