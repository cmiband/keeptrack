package com.sggw.kp_backend.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateRequest {

    @Size(max = 255)
    private String firstName;

    @Size(max = 255)
    private String lastName;

    private Integer age;

    @NotBlank(message = "Username is required")
    @Size(max = 255, message = "Username is too long")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 25, message = "Password must be between 6 and 25 characters long")
    private String password;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Pattern(regexp = "^[\\w.+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$", message = "Email must be valid")
    @Size(max = 255, message = "Email is too long")
    private String email;
}
