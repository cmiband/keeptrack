package com.sggw.kp_backend.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private Integer id;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "firstname", length = 50)
    private String firstName;

    @Column(name = "age")
    private Integer age;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "createddate")
    private LocalDate createdDate;

    @Column(name = "password")
    private String password;
}
