package com.sggw.kp_backend.auth.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Configuration
@ConfigurationProperties(prefix = "spring.jwt")
@Data
@Slf4j
public class JwtConfig {
    private String secret;
    private int accessTokenExpiration;
    private int refreshTokenExpiration;
    private SecretKey resolvedSecretKey;

    public SecretKey getSecretKey() {
        if (resolvedSecretKey != null) {
            return resolvedSecretKey;
        }

        if (secret == null || secret.isBlank()) {
            log.warn("spring.jwt.secret is empty; generating in-memory JWT key for this run only.");
            resolvedSecretKey = Jwts.SIG.HS256.key().build();
            return resolvedSecretKey;
        }

        var normalized = secret.trim();

        try {
            var decoded = Base64.getDecoder().decode(normalized);
            if (decoded.length >= 32) {
                resolvedSecretKey = Keys.hmacShaKeyFor(decoded);
                return resolvedSecretKey;
            }
        } catch (IllegalArgumentException ignored) {
        }

        var raw = normalized.getBytes(StandardCharsets.UTF_8);
        if (raw.length < 32) {
            throw new IllegalStateException("spring.jwt.secret must be at least 32 bytes (256 bits) for HS256.");
        }

        resolvedSecretKey = Keys.hmacShaKeyFor(raw);
        return resolvedSecretKey;
    }
}
