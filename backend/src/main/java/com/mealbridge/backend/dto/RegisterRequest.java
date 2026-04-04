package com.mealbridge.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String name;
    private String phone;
    private String role;

    private String organizationName;

    private Double latitude;
    private Double longitude;
    private String address;
}