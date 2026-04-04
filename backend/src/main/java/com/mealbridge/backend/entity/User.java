package com.mealbridge.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false)
    private String role; // DONOR or HOME

    private String organizationName;

    private Double latitude;

    private Double longitude;

    private String address;

    private LocalDateTime createdAt = LocalDateTime.now();
}